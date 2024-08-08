import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { z } from 'zod';
import {
  TB_member,
  TB_memberPlan,
  Z_organisation,
  Z_plan,
} from '../../../../../../libs/mx-schema/src';
import { other, success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { memberService } from './member.service';
import { addMonths, format, parse } from 'date-fns';
import { processEmailQueue } from '../../../shared/queue/process-email/process-email.queue';
import { hashPassword } from '../../../shared/password-hash';
import { generateInvoice } from './helpers/generate-membership-invoice.helper';

const getEmailHtml = (payload) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #007BFF;
      color: #fff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 0 0 10px;
      line-height: 1.6;
    }
    .highlight {
      font-weight: bold;
      color: #007BFF;
    }
    .credentials {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 5px;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Membership Activation
    </div>
    <div class="content">
      <p>Your membership has been <span class="highlight">activated</span> and is valid until <span class="highlight">${format(payload.endDate, 'MMM dd, yyyy')}</span>.</p>
      <p>Below are your credentials for accessing the member app:</p>
      <div class="credentials">
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Passcode:</strong> ${payload.passcode}</p>
      </div>
    </div>
    <div class="footer">
      If you have any questions, feel free to contact our support team.
    </div>
  </div>
</body>
</html>
`;
};

const bodyValidator = z.union([
  createInsertSchema(TB_member).omit({ organisationID: true }),
  createInsertSchema(TB_memberPlan).pick({ planID: true }),
  Z_plan.pick({ periodInMonths: true, amount: true }),
  z.object({ organisation: Z_organisation.pick({ name: true, email: true }) }),
]);

export default Router().post(
  '/create',
  secure,
  validate({
    body: bodyValidator,
  }),
  async (req, res) => {
    const member = await memberService.getByEmail(req.body.email);
    // if (member) {
    //   return other(res, `Member with email ${req.body.email} already exist`);
    // }

    const passcode = Math.floor(1000 + Math.random() * 9000);

    const payload: typeof TB_member.$inferInsert = {
      organisationID: req.user.organisationID,
      passcode: hashPassword(passcode.toString()),
      ...req.body,
    };
    const [newMember] = await memberService.createMember(payload);

    const memberPlanPayload = {
      planID: req.body.planID,
      memberID: newMember.id,
      endDate: addMonths(payload.joinDate, req.body.periodInMonths),
      startDate: parse(payload.joinDate, 'yyyy-MM-dd', new Date()),
    };
    // add member plan
    const [newMemberPlan] = await memberService.addPlan(memberPlanPayload);
    const pdfPath = await generateInvoice(
      {
        organisationEmail: req.body.organisation.email,
        amount: req.body.amount,
        endDate: format(memberPlanPayload.endDate, 'MM dd, yyyy'),
        datePaid: format(newMemberPlan.createdAt, 'MM dd, yyyy'),
        organisationName: req.body.organisation.name,
        periodInMonths: req.body.periodInMonths,
      },
      `${newMember.id}-invoice`,
    );

    await processEmailQueue.sendEmail({
      to: req.body.email,
      subject: 'New membership activated',
      html: getEmailHtml({
        email: payload.email,
        passcode,
        endDate: memberPlanPayload.endDate,
      }),
      attachments: [
        {
          filename: 'invoice.pdf',
          path: pdfPath,
          contentType: 'application/pdf',
        },
      ],
    });

    success(res, newMember, 'success');
  },
);

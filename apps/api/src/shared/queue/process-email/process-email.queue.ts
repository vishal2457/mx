import './process-email.worker';
import { BaseQueue } from '../base-queue';
import { emailWorker } from './process-email.worker';
import { GLOBAL_CONSTANTS } from '../../global-constants';

export class ProcessEmailQueue extends BaseQueue {
  constructor() {
    super(GLOBAL_CONSTANTS.QUEUE_NAMES.processEmail, emailWorker);
  }
  async sendEmail(
    name: string,
    data: {
      to: string;
      subject: string;
      html: string;
    }
  ) {
    return this.add(name, data);
  }

  async sendEmailWithTemplate(
    name: string,
    {
      to,
      subject,
      template,
      meta,
    }: {
      to: string;
      subject: string;
      template: string;
      meta: Record<string, any> | any[];
    }
  ) {
    // TODO: handle get email template with handle bar
    await this.sendEmail(name, { to, subject, html: '' });
  }
}

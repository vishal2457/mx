import { Router } from 'express';
import { other, success } from '../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';
import { hashPassword } from '../../../shared/password-hash';
import { userService } from '../user/user.service';
import { organisationService } from './organisation.service';
import { db } from '../../../db/db';
import { roleService } from '../role/role.service';
import {
  PERMISSIONS,
  RESOURCES,
  TB_rolePermission,
} from '../../../../../../libs/mx-schema/src';
import { processEmailQueue } from '../../../shared/queue/process-email/process-email.queue';
import { exerciseService } from '../exercise/exercise.service';
import { exerciseData } from '../../../db/seed/exersice';
import { bodyPartsData } from '../../../db/seed/body-parts';
import { bodyPartService } from '../body-part/body-part.service';

export default Router().post(
  '/create',
  ImageUpload.single('logo'),
  // validate({ body: createInsertSchema(TB_organisation) }),
  async (req, res) => {
    if (req?.file?.filename) {
      req.body['logo'] = req.file.filename;
    }

    const [existing] = await organisationService.getByEmail(req.body.email);
    if (existing) {
      return other(res, 'Organisation with this email already exist');
    }

    db.transaction(async (tx) => {
      const [org] = await organisationService.createOrganisation(req.body, tx);
      const [role] = await roleService.createRole(
        {
          name: 'Admin',
          description: 'All permissions',
          organisationID: org.id,
        },
        tx,
      );
      const [user] = await userService.createUser(
        {
          name: req.body.name,
          email: org.email,
          password: hashPassword('123'),
          organisationID: org.id,
        },
        tx,
      );

      await userService.createBulkUserRole(
        [{ userID: user.id, roleID: role.id }],
        tx,
      );

      //assign permissions to all resources
      const rolePremissionPayload = Object.keys(RESOURCES).reduce<
        Array<typeof TB_rolePermission.$inferInsert>
      >((acc, curr) => {
        acc.push({
          permission: PERMISSIONS.VIEW,
          menuName: RESOURCES[curr],
          roleID: role.id,
        });
        acc.push({
          permission: PERMISSIONS.UPDATE,
          menuName: RESOURCES[curr],
          roleID: role.id,
        });
        acc.push({
          permission: PERMISSIONS.CREATE,
          menuName: RESOURCES[curr],
          roleID: role.id,
        });
        return acc;
      }, []);

      await roleService.createRolePermission(rolePremissionPayload, tx);

      const exercisePayload = exerciseData.map((value) => ({
        ...value,
        organisationID: org.id,
      }));
      await exerciseService.createExercise(exercisePayload, tx);

      const bodyPartPayload = bodyPartsData.map((item) => ({
        ...item,
        organisationID: org.id,
      }));
      await bodyPartService.createBodyPart(bodyPartPayload, tx);

      await processEmailQueue.sendEmail({
        to: req.body.email,
        subject: 'New organisation created',
        html: `organisation created email: ${org.email}, password: 123`,
      });

      success(res, org, 'success');
    });
  },
);

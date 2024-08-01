import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';
import { hashPassword } from '../../../shared/password-hash';
import { userService } from '../user/user.service';
import { organisationService } from './organisation.service';

export default Router().post(
  '/create',
  ImageUpload.single('logo'),
  // validate({ body: createInsertSchema(TB_organisation) }),
  async (req, res) => {
    if (req?.file?.filename) {
      req.body['logo'] = req.file.filename;
    }
    const [org] = await organisationService.createOrganisation(req.body);
    await userService.createUser({
      name: req.body.name,
      email: org.email,
      password: hashPassword('123'),
      organisationID: org.id,
    });

    success(res, org, 'success');
  },
);

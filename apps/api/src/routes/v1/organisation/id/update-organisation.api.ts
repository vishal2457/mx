import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../../shared/middlewares/multer.middleware';
import { organisationService } from '../organisation.service';

export default Router().put(
  '/update/:id',
  // validate({
  //   body: createInsertSchema(TB_organisation),
  //   params: v_param_id,
  // }),
  ImageUpload.single('logo'),
  async (req, res) => {
    if (req?.file?.filename) {
      req.body['logo'] = req.file.filename;
    }
    const result = await organisationService.updateOrganisation(
      req.body,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.params.id,
    );
    success(res, result, 'updated');
  },
);

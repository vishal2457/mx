import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../../shared/middlewares/multer.middleware';
import { memberService } from '../member.service';

export default Router().patch(
  '/update-profile-pic/:id',
  ImageUpload.single('profilePic'),
  async (req, res) => {
    const result = await memberService.updateMember(
      { profilePic: req.file.filename },
      parseInt(req.params.id),
    );
    success(res, result, 'updated');
  },
);

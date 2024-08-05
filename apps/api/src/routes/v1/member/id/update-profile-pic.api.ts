import { Router } from 'express';
import {
  other,
  success,
} from '../../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../../shared/middlewares/multer.middleware';
import { memberService } from '../member.service';

export default Router().patch(
  '/update-profile-pic/:id',
  ImageUpload.single('profile-pic'),
  async (req, res) => {
    if (!req.file) {
      return other(res, 'Bad request');
    }
    const result = await memberService.updateMember(
      { profilePic: req.file.filename },
      parseInt(req.params.id),
    );
    success(res, result, 'updated');
  },
);

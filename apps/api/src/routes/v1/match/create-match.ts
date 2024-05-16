import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';
import { transformMatchBody } from './match.utils';
import { db } from '../../../db/db';
import { TB_match } from '../../../../../../libs/mx-schema/src';

const MatchImageUpload = ImageUpload.fields([
  { name: 'h2hTeamImage', maxCount: 1 },
  { name: 'premiumTeamImage', maxCount: 1 },
  { name: 'teamOneLogo', maxCount: 1 },
  { name: 'teamTwoLogo', maxCount: 1 },
]);

export default Router().post('/create', MatchImageUpload, async (req, res) => {
  const results = await db
    .insert(TB_match)
    .values({
      ...transformMatchBody(req.body),
      teamOneLogo: req.files?.['teamOneLogo'][0]?.filename || '',
      teamTwoLogo: req.files?.['teamTwoLogo'][0]?.filename || '',
      h2hTeamImage: req.files?.['h2hTeamImage'][0]?.filename || '',
      premiumTeamImage: req.files?.['premiumTeamImage'][0]?.filename || '',
    })
    .returning();
  success(res, results, 'success');
});

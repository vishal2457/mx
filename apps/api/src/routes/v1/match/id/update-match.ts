import { Router } from 'express';
import { ImageUpload } from '../../../../shared/middlewares/multer.middleware';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';
import { safeParse } from '../../../../../../../libs/helpers/src';
import { transformMatchBody } from '../match.utils';
import { TB_match, v_param_id } from '../../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';

const MatchImageUpload = ImageUpload.fields([
  { name: 'h2hTeamImage', maxCount: 1 },
  { name: 'premiumTeamImage', maxCount: 1 },
  { name: 'teamOneLogo', maxCount: 1 },
  { name: 'teamTwoLogo', maxCount: 1 },
]);

export default Router().put(
  '/:id',
  validate({ params: v_param_id }),
  MatchImageUpload,
  async (req, res) => {
    const previousFileNames = safeParse(req.body.previousFiles);
    const body = {
      ...transformMatchBody(req.body),
      teamOneLogo:
        req.files?.['teamOneLogo']?.[0]?.filename ||
        previousFileNames.teamOneLogo,
      teamTwoLogo:
        req.files?.['teamTwoLogo']?.[0]?.filename ||
        previousFileNames.teamTwoLogo,
      h2hTeamImage:
        req.files?.['h2hTeamImage']?.[0]?.filename ||
        previousFileNames.h2hTeamImage,
      premiumTeamImage:
        req.files?.['premiumTeamImage']?.[0]?.filename ||
        previousFileNames.premiumTeamImage,
    };

    const result = await db
      .update(TB_match)
      .set(body)
      .where(eq(TB_match.id, parseInt(req.params.id)));
    success(res, result, 'success');
  }
);

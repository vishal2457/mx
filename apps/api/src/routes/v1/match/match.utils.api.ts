import { z } from 'zod';
import { TB_match } from '../../../../../../libs/mx-schema/src';
import { slugify } from '../../../../../../libs/helpers/src';
import { InferInsertModel } from 'drizzle-orm';

export const transformMatchBody = (body: InferInsertModel<typeof TB_match>) => {
  return {
    ...body,
    teamOneSlug: slugify(body.teamOne),
    teamTwoSlug: slugify(body.teamTwo),
  };
};

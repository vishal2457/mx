import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { safeParse } from '../../../../../../libs/helpers/src';

export const getListQueryWithFilters = (schema, options) => {
  const { filters: incomingFilters, limit, offset } = options;
  const filters = safeParse(incomingFilters);

  const query = db.select().from(schema).$dynamic();

  // add where conditions
  if (Array.isArray(filters) && filters?.length) {
    for (const filter of filters) {
      query.where(eq(schema[filter.field], filter.value));
    }
  }

  // add pagination
  if (limit && offset) {
    query.limit(limit).offset(offset);
  }

  return query;
};

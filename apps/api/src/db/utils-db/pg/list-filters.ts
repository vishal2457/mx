import { eq } from 'drizzle-orm';
import { db } from '../../db';

export const getListQueryWithFilters = (schema, options) => {
  const { filters, limit, offset } = options;

  const query = db.select().from(schema).$dynamic();

  // add where conditions
  if (filters?.length) {
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

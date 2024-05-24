import { eq, getTableColumns } from 'drizzle-orm';
import { db } from '../../../db';
import { ListFilters } from '../../../../../../../libs/mx-schema/src';

type Options = Omit<ListFilters, 'page'> & { offset: number };

export const getListQueryWithFilters = (schema, options: Options) => {
  const { filters, limit, offset, fields } = options;

  // let selectedFields: any = {};
  if (fields.length) {
    // const columns = getTableColumns(schema);
    // selectedFields = fields.reduce((acc, ) => {
    // }, {})
  }

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

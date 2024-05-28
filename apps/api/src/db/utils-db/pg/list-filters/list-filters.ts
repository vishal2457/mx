import { between, eq, getTableColumns, gt, like, lt, ne } from 'drizzle-orm';
import { db } from '../../../db';
import {
  FilterData,
  ListFilters,
} from '../../../../../../../libs/mx-schema/src';
import { expandFilters } from '../../../../../../../libs/helpers/src';

type Options = Omit<ListFilters, 'page'> & { offset: number };

export const getListQueryWithFilters = (schema, options: Options) => {
  const { filters, limit, offset, fields } = options;

  const _columns: any = getTableColumns(schema);
  let columns = _columns;

  if (fields.length) {
    columns = fields.reduce((acc, curr) => {
      if (_columns[curr]) acc[curr] = _columns[curr];
      return acc;
    }, {});
  }

  const query = db.select(columns).from(schema).$dynamic();
  const expandedFilters: FilterData[] = expandFilters(filters);
  // add where conditions
  if (expandedFilters?.length) {
    for (const filter of expandedFilters) {
      const column = schema[filter.field];
      if (filter.condition === 'equals') {
        query.where(eq(column, filter.value));
      } else if (filter.condition === 'greater than') {
        query.where(gt(column, filter.value));
      } else if (filter.condition === 'less than') {
        query.where(lt(column, filter.value));
      } else if (filter.condition === 'not equal') {
        query.where(ne(column, filter.value));
      } else if (filter.condition === 'contains') {
        query.where(like(column, `%${filter.value}%`));
      } else if (filter.condition === 'between') {
        const stringValue = filter.value.toString();
        const [value1, value2] = stringValue.includes('-')
          ? stringValue.split('-')
          : [];
        if (value1 && value2) {
          query.where(between(column, value1, value2));
        }
      }
    }
  }

  // add pagination
  if (limit && offset) {
    query.limit(limit).offset(offset);
  }
  return query;
};

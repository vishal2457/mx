import {
  asc,
  between,
  desc,
  eq,
  getTableColumns,
  gt,
  like,
  lt,
  ne,
} from 'drizzle-orm';
import { Request } from 'express';
import { expandFilters } from '../../../../../../../libs/helpers/src';
import {
  c_pagination,
  FilterData,
  v_list_filters,
} from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../db';

export const getListQueryWithFilters = (
  schema,
  queryParams: Request['query']
) => {
  const { filters, sort, limit, page, fields } =
    v_list_filters.parse(queryParams);

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

  // add sort condition
  if (sort?.Asc) {
    query.orderBy(asc(columns[sort.Asc]));
  } else if (sort?.Desc) {
    query.orderBy(desc(columns[sort.Desc]));
  }

  // add pagination
  if (limit ?? page) {
    const pagination = c_pagination({
      limit,
      page,
    });
    query.limit(pagination.limit).offset(pagination.offset);
  }
  return query;
};

import {
  and,
  asc,
  between,
  desc,
  eq,
  getTableColumns,
  gt,
  like,
  lt,
  ne,
  SQLWrapper,
} from 'drizzle-orm';
import { Request } from 'express';
import { expandFilters } from '../../../../../../../libs/helpers/src';
import {
  c_pagination,
  FilterData,
  v_list_filters,
} from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../db';
import { PgSelect } from 'drizzle-orm/pg-core';

export const getListQueryWithFilters = (
  table,
  queryParams: Request['query'],
  defaultWhere: SQLWrapper[] = [],
): PgSelect => {
  const { filters, sort, limit, page, fields } =
    v_list_filters.parse(queryParams);

  const _columns: any = getTableColumns(table);
  let columns = _columns;

  if (fields.length) {
    columns = fields.reduce((acc, curr) => {
      if (_columns[curr]) acc[curr] = _columns[curr];
      return acc;
    }, {});
  }

  const query = db
    .select(fields.length ? columns : null)
    .from(table)
    .$dynamic();
  const expandedFilters: FilterData[] = expandFilters(filters);
  const whereCondition: any[] = [...defaultWhere];
  // add where conditions
  if (expandedFilters?.length) {
    for (const filter of expandedFilters) {
      const column = table[filter.field];
      if (filter.condition === 'equals') {
        whereCondition.push(eq(column, filter.value));
      } else if (filter.condition === 'greater than') {
        whereCondition.push(gt(column, filter.value));
      } else if (filter.condition === 'less than') {
        whereCondition.push(lt(column, filter.value));
      } else if (filter.condition === 'not equal') {
        whereCondition.push(ne(column, filter.value));
      } else if (filter.condition === 'contains') {
        whereCondition.push(like(column, `%${filter.value}%`));
      } else if (filter.condition === 'between') {
        const stringValue = filter.value.toString();
        const [value1, value2] = stringValue.includes('-')
          ? stringValue.split('-')
          : [];
        if (value1 && value2) {
          whereCondition.push(between(column, value1, value2));
        }
      }
    }
  }

  const whereConditionLength = whereCondition.length;

  if (whereConditionLength) {
    if (whereConditionLength >= 1) {
      query.where(and(...whereCondition));
    } else {
      query.where(whereCondition[0]);
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

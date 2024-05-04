import { Request, Response } from 'express';
import { serverError } from '../api-response/response-handler';

// eslint-disable-next-line max-params
const errorHandler = (_: Request, res: Response) => {
  // eslint-disable-next-line no-console
  // serverError(res, err);
};

export default errorHandler;

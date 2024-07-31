import { NextFunction, Request, Response } from 'express';
import { serverError } from '../api-response/response-handler';

// eslint-disable-next-line max-params
const errorHandler = (err, _: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  serverError(res, err);
};

export default errorHandler;

import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { exit } from 'process';
import logger from '../logger/logger';
import HttpError from '../utils/error-http';
import InternalServerError from '../utils/error-internal';

const transformError = (err: InternalServerError, promise?: Promise<void>): InternalServerError => ({
  ...err,
  message: `Internal Server Error: ${
    err.message
  }, ${JSON.stringify(promise) || ''}`
});

const errorNotFound = (req: Request, _res: Response, next: NextFunction): void => {
  const url = req.originalUrl;
  next(
    new HttpError({
      message: "Couldn't find a(an) URL",
      status: `${StatusCodes.NOT_FOUND}`,
      params: url
    })
  );
};

const errorClientHandler = (err: HttpError | InternalServerError, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof HttpError) {
    logger.errorsClientHandler(err, req);
    
    const {status, message} = err;

    res.status(parseInt(status, 10)).send(message);

    return;
  }
  next(err);
};

const errorHandler = (err: InternalServerError, _req: Request, res: Response, next: NextFunction): void => {
  logger.errorsHandler(err);

  const {status, message} = err;

  res
    .status(parseInt(status, 10) || StatusCodes.INTERNAL_SERVER_ERROR)
    .send(message || 'Internal Server Error');
  next();
};

const uncaughtExceptionHandler = (err: InternalServerError): void => {
  logger.errorsHandler(transformError(err), (): never => exit(1));
}; 

const unhandledRejectionHandler = (reason: InternalServerError, promise: Promise<void>): void => {
  logger.errorsHandler(transformError(reason, promise));
  exit(1);
};

export {
  errorNotFound,
  errorClientHandler,
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler
};

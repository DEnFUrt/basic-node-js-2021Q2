import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { exit } from 'process';
import logger from '../logger/logger';
import HttpError from '../utils/error-http';
import InternalServerError from '../utils/error-internal';
import { fullUrl } from '../utils/full-url';

const transformError = (err: InternalServerError, promise?: Promise<void>): InternalServerError => ({
  ...err,
  status: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
  message: `Internal Server Error: ${
    err.message
  }, ${JSON.stringify(promise) || ''}`
});

const errorNotFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(StatusCodes.NOT_FOUND).send(`message: Couldn't find a(an) URL: ${fullUrl(req)}`);
  
  next();
  /* next(
    new HttpError({
      message: `Couldn't find a(an) URL: ${fullUrl(req)}`,
      status: `${StatusCodes.NOT_FOUND}`,
    })
  ); */
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
  
  setTimeout((): never => exit(1), 10);
};

export {
  errorNotFound,
  errorClientHandler,
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler
};

import { finished } from 'stream';
import Url from 'url';
import { Response, Request, NextFunction } from 'express';
import { streamConsLog, streamErrLog, streamInfoLog } from './streams';
import { NODE_ENV } from '../common/config';
import HttpError from '../utils/error-http';
import InternalServerError from '../utils/error-internal';
import { 
  IJsonMessage,
  ITaskBodyParser,
  IBoardBodyParser,
  IUserBodyParser
} from '../common/interfaces';

type PropsWriteLog = { textMessage: string; jsonMessage: IJsonMessage; logType: string };
type BodyParser = ITaskBodyParser & IBoardBodyParser & IUserBodyParser;

const fullUrl = (req: Request): string => Url.format({ // Разобраться с новым методом
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });

const hidePass = (body: BodyParser): BodyParser => body.password !== undefined ? { ...body, password: '*****' } : body;

const writeLog = ({ textMessage, jsonMessage, logType }: PropsWriteLog): void => {
  switch (logType) {
    case 'info':
      streamInfoLog(`${JSON.stringify(jsonMessage)}\n`);
      break;
    case 'error':
      streamErrLog(`${JSON.stringify(jsonMessage)}\n`);
      break;
    default:
      break;
  }
  if (NODE_ENV !== 'production') {
    streamConsLog(`${textMessage}\n`);
  }
};

const serverInfo = (message: string): void => {
  const stampDate = new Date().toLocaleString();
  const textMessage = `Info: ${stampDate} -> ${message}`;

  const jsonMessage = {
    Info: stampDate,
    message
  };

  writeLog({ textMessage, jsonMessage, logType: 'info' });
};

const info = (req: Request, res: Response, next: NextFunction): void => {
  const { method, query } = req;
  const body = req.body as BodyParser;
  const url = fullUrl(req);
  const startTime = Date.now();

  const permittedBody = hidePass(body);

  next();

  finished(res, (): void => {
    const ms = Date.now() - startTime;
    const { statusCode } = res;
    const stampDate = new Date().toLocaleString();

    const textMessage = `Info: ${stampDate} -> ${method}, ${statusCode} url: ${url}, query: ${JSON.stringify(
      query
    )}, body: ${JSON.stringify(permittedBody)} - [${ms} ms.]`;

    const jsonMessage = {
      Info: stampDate,
      method,
      statusCode,
      url,
      query,
      body: permittedBody,
      ms
    };

    writeLog({ textMessage, jsonMessage, logType: 'info' });
  });
};

const errorHandler = (err: InternalServerError): void => {
  const {
    message = 'message does not exist',
    stack = 'stack does not exist',
    status = 'status does not exist' } = err;
  const stampDate = new Date().toLocaleString();

  const textMessage = `Error: ${stampDate} -> Status: ${status}, Message: ${message},\nStack: ${stack}`;

  const jsonMessage = {
    Error: stampDate,
    status,
    message,
    stack
  };

  writeLog({ textMessage, jsonMessage, logType: 'error' });
};

const errorClientHandler = (err: HttpError, req: Request): void => {
  const {
    message = 'message does not exist',
    stack = 'stack does not exist',
    status = 'status does not exist'
  } = err;
  const { method = 'method does not exist' } = req;
  const url = req ? fullUrl(req) : '';
  const stampDate = new Date().toLocaleString();

  const textMessage = `Error: ${stampDate} -> Method: ${method}, Status: ${status}, URL: ${url}, Message: ${message},\nStack: ${stack}`;

  const jsonMessage = {
    Error: stampDate,
    method,
    status,
    url,
    message,
    stack
  };

  writeLog({ textMessage, jsonMessage, logType: 'error' });
};


const logger = {
  info,
  serverInfo,
  errorHandler,
  errorClientHandler
};

export = logger;
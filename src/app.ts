import express, { Application, Response, Request, NextFunction } from 'express';
import YAML from 'yamljs';
import path from 'path';
import swaggerUI from 'swagger-ui-express';

import userRouter from './resources/users/user-router';
import boardRouter from './resources/boards/board-router';
import taskRouter from './resources/tasks/task-router';

import * as logger from './logger/logger';
import { NODE_ENV } from './common/config';
import {
  errorNotFound,
  errorClientHandler,
  errorHandler,
} from './errors-handler/error-handler';

const app: Application = express();

app.use(express.json());

if (NODE_ENV !== 'production') {
  app.use(
    '/doc',
    swaggerUI.serve,
    swaggerUI.setup(YAML.load(path.join(__dirname, '../doc/api.yaml'))),
  );
}

app.use(logger.info);

app.use('/', (req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorNotFound);

app.use(errorClientHandler);

app.use(errorHandler);

// PUT IT HERE
// throw Error('uncaughtException:  Oops!');

// PUT IT HERE
// Promise.reject(Error('Promise: Oops!'));

export default app;

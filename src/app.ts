import express, { Application, Response, Request, NextFunction } from 'express';
import YAML from 'yamljs';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import StatusCodes from 'http-status-codes';
import userRouter from './resources/users/user-router';
import boardRouter from './resources/boards/board-router';
import taskRouter from './resources/tasks/task-router';

const app: Application = express();

app.use(express.json());

if (process.env['NODE_ENV'] !== 'production') {
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(YAML.load(path.join(__dirname, '../doc/api.yaml'))));
}

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  process.stderr.write(err.message);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(`Something broke! Hz what: ${err.message}`);
  next();
});

export default app;
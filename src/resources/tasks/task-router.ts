import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import * as taskService from './task-service';
import { ITaskBodyParser } from '../../common/interfaces';

const router = Router({ mergeParams: true });

router.route('/').get(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;

  try {
    const tasks = await taskService.getAllByBoardId(boardId);
    res.json(tasks);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send((e as Error).message);
  }
});

router.route('/:id').get(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const taskId = req.params['id'] as string;

  try {
    const task = await taskService.getByBoardId({ boardId, taskId });
    res.json(task);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send((e as Error).message);
  }
});

router.route('/').post(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const { title, order, description, userId, columnId } = req.body as ITaskBodyParser;

  try {
    const task = await taskService.create({
      title,
      order,
      description,
      userId,
      columnId,
      boardId,
    });

    res.status(StatusCodes.CREATED).json(task);
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: `Bad request: ${(e as Error).message}` });
  }
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const taskId = req.params['id'] as string;
  const { title, order, description, userId, columnId } = req.body as ITaskBodyParser;

  try {
    const task = await taskService.put({
      boardId,
      taskId,
      title,
      order,
      description,
      userId,
      columnId,
    });
    res.json(task);
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: `Bad request: ${(e as Error).message}` });
  }
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  const boardId = req.params['boardId'] as string;
  const taskId = req.params['id'] as string;

  try {
    const result = await taskService.del({ boardId, taskId });

    if (result) {
      res.status(StatusCodes.OK).send({ message: 'The task has been deleted' });
    }
  } catch (e) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: `Task not found: ${(e as Error).message}` });
  }
});

export default router;

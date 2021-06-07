import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import * as taskService from './task-service';
import { ITaskBodyParser } from '../../common/interfaces';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const tasks = await taskService.getAllByBoardId(boardId);
    
    res.json(tasks);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['id'] as string;
    const task = await taskService.getByBoardId({ boardId, taskId });

    res.json(task);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const { title, order, description, userId, columnId } = req.body as ITaskBodyParser;
    const task = await taskService.create({
      title,
      order,
      description,
      userId,
      columnId,
      boardId,
    });

    res.status(StatusCodes.CREATED).json(task);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['id'] as string;
    const { title, order, description, userId, columnId } = req.body as ITaskBodyParser;
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
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['id'] as string;
    const result = await taskService.del({ boardId, taskId });

    if (result) {
      res.status(StatusCodes.OK).send({ message: 'The task has been deleted' });
    }
  })
);

export default router;

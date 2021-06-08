import { Response, Request, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as taskService from './task-service';
import { ITaskBodyParser, ITaskResponse, IBoardResponse } from '../../common/interfaces';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const result = await taskService.getAllByBoardId(boardId);
    const { statusCode, sendMessage }: ITaskResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['id'] as string;
    const result = await taskService.getByBoardId({ boardId, taskId });
    const { statusCode, sendMessage }: ITaskResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const { title, order, description, userId, columnId } = req.body as ITaskBodyParser;
    const result = await taskService.create({
      title,
      order,
      description,
      userId,
      columnId,
      boardId,
    });
    const { statusCode, sendMessage }: ITaskResponse | IBoardResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['id'] as string;
    const { title, order, description, userId, columnId } = req.body as ITaskBodyParser;
    const result = await taskService.put({
      boardId,
      taskId,
      title,
      order,
      description,
      userId,
      columnId,
    });
    const { statusCode, sendMessage }: ITaskResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const boardId = req.params['boardId'] as string;
    const taskId = req.params['id'] as string;
    const result = await taskService.del({ boardId, taskId });
    const { statusCode, sendMessage }: ITaskResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

export default router;

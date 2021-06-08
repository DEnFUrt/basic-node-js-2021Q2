import { Response, Request, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as usersService from './user-service';
import { IUserBodyParser, IUserResponse, ITaskResponse } from '../../common/interfaces';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const result = await usersService.getAll();
    const { statusCode, sendMessage }: IUserResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const result = await usersService.get(id);
    const { statusCode, sendMessage }: IUserResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, login, password } = req.body as IUserBodyParser;
    const result = await usersService.create({ name, login, password });
    const { statusCode, sendMessage }: IUserResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const { name, login, password } = req.body as IUserBodyParser;
    const result = await usersService.put({ id, name, login, password });
    const { statusCode, sendMessage }: IUserResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const result = await usersService.del(id);
    const { statusCode, sendMessage }: IUserResponse | ITaskResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

export default router;

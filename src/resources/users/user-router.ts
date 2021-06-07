import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import * as usersService from './user-service';
import { IUserBodyParser } from '../../common/interfaces';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const users = await usersService.getAll();

    res.json(users);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const user = await usersService.get(id);

    res.json(user);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, login, password } = req.body as IUserBodyParser;
    const user = await usersService.create({ name, login, password });

    res.status(StatusCodes.CREATED).json(user);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const { name, login, password } = req.body as IUserBodyParser;
    const user = await usersService.put({ id, name, login, password });

    res.json(user);
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const result = await usersService.del(id);

    if (result) {
      res.status(StatusCodes.NO_CONTENT).send({ message: 'The user has been deleted' });
    }
  })
);

export default router;

import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import * as usersService from './user-service';
import { IUserBodyParser } from '../../common/interfaces';

const router = Router();

router.route('/').get(
  async (_req: Request, res: Response): Promise<void> => {
    const users = await usersService.getAll();

    res.json(users);
  },
);

router.route('/:id').get(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;

    try {
      const user = await usersService.get(id);

      res.json(user);
    } catch (e) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: `User not found: ${(e as Error).message}` });
    }
  },
);

router.route('/').post(
  async (req: Request, res: Response): Promise<void> => {
    const { name, login, password } = req.body as IUserBodyParser;

    try {
      const user = await usersService.create({ name, login, password });

      res.status(StatusCodes.CREATED).json(user);
    } catch (e) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: `Bad request: ${(e as Error).message}` });
    }
  },
);

router.route('/:id').put(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const { name, login, password } = req.body as IUserBodyParser;

    try {
      const user = await usersService.put({ id, name, login, password });

      res.json(user);
    } catch (e) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: `Bad request: ${(e as Error).message}` });
    }
  },
);

router.route('/:id').delete(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;

    try {
      const result = await usersService.del(id);

      if (result) {
        res.status(StatusCodes.NO_CONTENT).send({ message: 'The user has been deleted' });
      }
    } catch (e) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: `User not found: ${(e as Error).message}` });
    }
  },
);

export default router;

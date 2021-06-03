import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import * as boardService from './board-service';
import { IBoardBodyParser } from '../../common/interfaces';

const router = Router();

router.route('/').get(
  async (_req: Request, res: Response): Promise<void> => {
    const boards = await boardService.getAll();

    res.json(boards);
  },
);

router.route('/:id').get(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;

    try {
      const board = await boardService.get(id);

      res.json(board);
    } catch (e) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: `Board not found: ${(e as Error).message}` });
    }
  },
);

router.route('/').post(
  async (req: Request, res: Response): Promise<void> => {
    const { title, columns } = req.body as IBoardBodyParser;

    try {
      const board = await boardService.create({ title, columns });

      res.status(StatusCodes.CREATED).json(board);
    } catch (e) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: `Bad request: ${(e as Error).message}` });
    }
  },
);

router.route('/:id').put(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body as IBoardBodyParser;

    try {
      const board = await boardService.put({ id, title, columns });

      res.json(board);
    } catch (e) {
      res.status(StatusCodes.BAD_REQUEST).send({ message: `Bad request: ${(e as Error).message}` });
    }
  },
);

router.route('/:id').delete(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;

    try {
      const result = await boardService.del(id);

      if (result) {
        res.status(StatusCodes.NO_CONTENT).send({ message: 'The board has been deleted' });
      }
    } catch (e) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: `Board not found: ${(e as Error).message}` });
    }
  },
);

export default router;

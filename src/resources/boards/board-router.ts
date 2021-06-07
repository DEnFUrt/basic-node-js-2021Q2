import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import * as boardService from './board-service';
import { IBoardBodyParser } from '../../common/interfaces';
// import HttpError from '../../utils/error-http';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const boards = await boardService.getAll();

    res.json(boards);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const board = await boardService.get(id);

    res.json(board);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title, columns } = req.body as IBoardBodyParser;
    const board = await boardService.create({ title, columns });

    res.status(StatusCodes.CREATED).json(board);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body as IBoardBodyParser;
    const board = await boardService.put({ id, title, columns });

    res.json(board);
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const result = await boardService.del(id);

    if (result) {
      res.status(StatusCodes.NO_CONTENT).send({ message: 'The board has been deleted' });
    }
  })
);

export default router;

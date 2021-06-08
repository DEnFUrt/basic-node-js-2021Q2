import { Response, Request, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as boardService from './board-service';
import { IBoardBodyParser, IBoardResponse } from '../../common/interfaces';
// import HttpError from '../../utils/error-http';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const result = await boardService.getAll();
    const { statusCode, sendMessage }: IBoardResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const result = await boardService.get(id);
    const { statusCode, sendMessage }: IBoardResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title, columns } = req.body as IBoardBodyParser;
    const result = await boardService.create({ title, columns });
    const { statusCode, sendMessage }: IBoardResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const { title, columns } = req.body as IBoardBodyParser;
    const result = await boardService.put({ id, title, columns });
    const { statusCode, sendMessage }: IBoardResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params['id'] as string;
    const result = await boardService.del(id);
    const { statusCode, sendMessage }: IBoardResponse = result;

    res.status(statusCode).json(sendMessage);
  })
);

export default router;

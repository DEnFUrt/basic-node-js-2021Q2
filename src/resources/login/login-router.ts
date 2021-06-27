import { Response, Request, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validate } from '../../utils/entity-validator-handler';
import { NODE_ENV } from '../../common/config';
import { ILoginBodyParser } from '../../common/interfaces';
import * as LoginService from './login-service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    res.json('token');
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { login, password } = req.body as ILoginBodyParser;

    if (NODE_ENV === 'production') {
      validate('auth', { login, password });
    }

    const token = await LoginService.signToken({ login, password });

    res.json(token);
  }),
);

export default router;

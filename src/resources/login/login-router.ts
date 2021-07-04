import { Response, Request, Router } from 'express';
import StatusCodes from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { validate } from '../../utils/entity-validator-handler';
import { NODE_ENV } from '../../common/config';
import { ILoginBodyParser } from '../../common/interfaces';
import * as LoginService from './login-service';

const { ACCEPTED } = StatusCodes;

const router = Router();

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { login, password } = req.body as ILoginBodyParser;

    if (NODE_ENV === 'production') {
      validate('auth', { login, password });
    }

    const result = await LoginService.signToken({ login, password });
    const { statusCode, sendMessage } = result;

    if (statusCode === ACCEPTED) {
      res.json({ token: sendMessage });
    } else {
      res.status(statusCode).json(sendMessage);
    }
  }),
);

export default router;

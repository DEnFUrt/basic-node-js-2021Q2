import StatusCodes from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';
import { verify, sign, Secret, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';
import { JWT_SECRET_KEY, EXPIRES_IN } from '../common/config';
import HttpError from '../utils/error-http';
import InternalServerError from '../utils/error-internal';

type AuthUser = { id: string; login: string };

const { UNAUTHORIZED } = StatusCodes;

const jwtVerify = promisify<string, Secret>(verify);
const jwtSign = promisify<AuthUser, Secret, SignOptions>(sign);

export const verifyToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.header('Authorization');

  try {
    if (authHeader === undefined) {
      throw Error();
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || token === undefined) {
      throw Error();
    }

    await jwtVerify(token, JWT_SECRET_KEY as Secret);

    return next();
  } catch {
    return next(
      new HttpError({
        status: `${UNAUTHORIZED}`,
        message: 'Wrong auth schema!',
      }),
    );
  }
};

export const createToken = async ({ id, login }: AuthUser): Promise<void | string> => {
  try {
    return await jwtSign({ id, login }, JWT_SECRET_KEY as Secret, {
      expiresIn: EXPIRES_IN,
    });
  } catch (e) {
    throw new InternalServerError((e as Error).message);
  }
};

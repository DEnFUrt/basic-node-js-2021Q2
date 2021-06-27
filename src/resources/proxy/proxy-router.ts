import { Response, Request, NextFunction } from 'express';
import { ROUTE_WHITELIST } from '../../common/config';
import { verifyToken } from '../../utils-crypto/token-helper';

const proxyRouter = (req: Request, res: Response, next: NextFunction): void | undefined => {
  const result = ROUTE_WHITELIST.includes(req.path);

  if (!result) {
    void verifyToken(req, res, next);
    return;
  }
  next();
};

export default proxyRouter;

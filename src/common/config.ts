import dotenv from 'dotenv';
import path from 'path';
import appRoot from 'app-root-path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

if (!process.env['PORT']) {
  process.stderr.write('Server port not specified!');
  process.exit(1);
}

const APPROOT = String(appRoot);

export const DIR_LOG = `${APPROOT}/logs`;
export const ERROR_LOG = 'error.log';
export const INFO_LOG = 'app.log';
export const ENTITY_USER = 'user';
export const ENTITY_BOARD = 'board';
export const ENTITY_TASK = 'task';
export const LOG_REWRITE_EVERY_DAY = true;
export const LOG_REWRITE_OVERSIZE = 1048576 as number; // 1Mb = 1048576

export const AUTH_MODE: boolean = process.env['AUTH_MODE'] === 'true';
export const PORT: number = parseInt(process.env['PORT'], 10);
export const { NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } = process.env;

// export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };

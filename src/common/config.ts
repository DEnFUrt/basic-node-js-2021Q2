import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

if (!process.env['PORT']) {
  process.stderr.write('Server port not specified!');
  process.exit(1);
}

const AUTH_MODE: boolean = process.env['AUTH_MODE'] === 'true';
const PORT: number = parseInt(process.env['PORT'], 10);
const { NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } = process.env;

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };

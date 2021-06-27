import { PORT, PG_PORT, PG_HOST } from './common/config';
import * as logger from './logger/logger';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './errors-handler/error-handler';
import { connectPg } from './db';

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

// eslint-disable-next-line import/first
import app from './app';

connectPg()
  .then(() => {
    logger.serverInfo(
      `Connected to PostgresSql DB: example - ${<string>PG_HOST}, port - ${<string>PG_PORT}`,
    );
    app.listen(PORT, (): void => logger.serverInfo(`App is running on http://localhost:${PORT}`));
  })
  .catch((e) => logger.errorsHandler(e));

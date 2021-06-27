import { PORT, PG_PORT, PG_HOST } from './common/config';
import * as logger from './logger/logger';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './errors-handler/error-handler';
import { connectPg } from './db';
import { createAdmin } from './utils/init-BD-createAdmin';

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

// eslint-disable-next-line import/first
import app from './app';

connectPg()
  .then(() => {
    logger.serverInfo(
      `Connected to PostgresSql DB: example - ${<string>PG_HOST}, port - ${<string>PG_PORT}`,
    );

    void createAdmin()
      .then(() =>
        logger.serverInfo(`Admin user exists or has been created: login - admin, password - admin`),
      )
      .catch((e) => logger.errorsHandler(e));

    app.listen(PORT, (): void => logger.serverInfo(`App is running on http://localhost:${PORT}`));
  })
  .catch((e) => logger.errorsHandler(e));

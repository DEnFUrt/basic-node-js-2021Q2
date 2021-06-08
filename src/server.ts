import { PORT } from './common/config';
import * as logger from './logger/logger';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './errors-handler/error-handler';

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

// eslint-disable-next-line import/first
import app from './app';

app.listen(PORT, (): void => logger.serverInfo(`App is running on http://localhost:${PORT}`));

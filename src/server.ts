import app from './app';
import { PORT } from './common/config';
import * as logger from './logger/logger';

app.listen(
  PORT, (): void => 
    logger.serverInfo(`App is running on http://localhost:${PORT}`)
);

import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { PG_USER, PG_PASSWORD, PG_DB, PG_PORT, PG_NO_LOGS, PG_NO_SYNC } from './config';

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: 'localhost',
  port: PG_PORT ? parseInt(PG_PORT, 10) : 5432,
  username: PG_USER || 'postgres',
  password: PG_PASSWORD || 'postgres',
  database: PG_DB || 'test',
  synchronize: !PG_NO_SYNC,
  logging: !PG_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  entities: [`src/resources/entity/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/resources/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  subscribers: [`src/resources/subscriber/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    'entitiesDir': 'src/resources/entity',
    'migrationsDir': 'src/resources/migration',
  },
} as ConnectionOptions;

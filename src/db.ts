import { createConnection, Connection, getConnection } from 'typeorm';
import ORMConfig from './common/ormconfig';
import InternalServerError from './utils/error-internal';

export const connectPg = async (): Promise<void> => {
  let connection: Connection | undefined;

  try {
    connection = getConnection();
  } catch {
    try {
      if (connection) {
        if (!connection.isConnected) {
          await connection.connect();
        }
      } else {
        await createConnection(ORMConfig);
      }
    } catch (e) {
      throw new InternalServerError((e as Error).message, (e as Error).stack);
    }
  }
};

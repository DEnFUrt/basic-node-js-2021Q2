import { getConnection, QueryRunner } from 'typeorm';
import StatusCodes from 'http-status-codes';
import { getUserByLogin, create } from '../resources/users/user-service';
import { PG_DB, LOGIN_ADMIN, PASSWORD_ADMIN } from '../common/config';
import logger from '../logger/logger';

const { OK } = StatusCodes;
const TABLE_NAME = 'user'; // user table name

export const createAdmin = async (): Promise<void> => {
  try {
    const connection = getConnection();
    const queryRunner: QueryRunner = connection.createQueryRunner();

    if (!(await queryRunner.hasDatabase(<string>PG_DB))) {
      throw Error(`${<string>PG_DB} database does not exist, check config file`);
    }

    if (!(await queryRunner.hasTable(TABLE_NAME))) {
      const resultMigration = await connection.runMigrations();

      if (resultMigration.length === 0) {
        throw Error(
          `No migration file was found, to generate the migration file, run the command: npm run migration:generation -n <nameMigration>, also restart app!`,
        );
      }

      logger.serverInfo(
        `Migration was perfomed with yhe following parameters: ${JSON.stringify(resultMigration)}`,
      );
    }

    const user = await getUserByLogin(<string>LOGIN_ADMIN);

    if (user.statusCode === OK) {
      return;
    }

    await create({ name: 'Admin', login: <string>LOGIN_ADMIN, password: <string>PASSWORD_ADMIN });
  } catch (e) {
    throw Error(e);
  }
};

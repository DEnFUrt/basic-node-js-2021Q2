import StatusCodes from 'http-status-codes';
import { IUserResponse, ITaskResponse, IUserBodyParser } from '../../common/interfaces';
import * as usersRepo from './user-db-repository';
import * as tasksRepo from '../tasks/task-db-repository';
import * as logger from '../../logger/logger';

const { OK } = StatusCodes;

const getAll = async (): Promise<IUserResponse> => usersRepo.getAll();

const get = async (id: string): Promise<IUserResponse> => usersRepo.get(id);

const create = async (props: IUserBodyParser): Promise<IUserResponse> => usersRepo.create(props);

const put = async (props: IUserBodyParser): Promise<IUserResponse> => {
  const { id } = props;
  const searchResultUser = await get(<string>id);

  if (searchResultUser.statusCode !== OK) {
    return searchResultUser;
  }

  return usersRepo.update(props);
};

const del = async (id: string): Promise<IUserResponse | ITaskResponse> => {
  const result = await get(id);

  if (result.statusCode !== OK) {
    return result;
  }

  const resNullifyUserId = await tasksRepo.nullifyUserId(id);
  const { statusCode, sendMessage } = resNullifyUserId;

  if (statusCode === OK && typeof sendMessage === 'string') {
    logger.serverInfo(sendMessage);
  }

  return usersRepo.del(id);
};

export { getAll, get, create, put, del };

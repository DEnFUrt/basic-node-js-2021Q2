import StatusCodes from 'http-status-codes';
import { IUserResponse, ITaskResponse, IUserBodyParser } from '../../common/interfaces';
import * as usersRepo from './user-db-repository';
import * as tasksRepo from '../tasks/task-memory-repository';

const { OK, NO_CONTENT } = StatusCodes;

const getAll = async (): Promise<IUserResponse> => usersRepo.getAll();

const get = async (id: string): Promise<IUserResponse> => usersRepo.get(id);

const create = async(props: IUserBodyParser): Promise<IUserResponse> => usersRepo.create(props);

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

  const resResetUserId = await tasksRepo.resetUserId(id);

  if (resResetUserId.statusCode !== NO_CONTENT) {
    return resResetUserId;
  }

  return usersRepo.del(id);
};

export { getAll, get, create, put, del };

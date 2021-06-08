import { IUserResponse } from '../../common/interfaces';
import * as usersRepo from './user-memory-repository';
import User from './user-model';
import * as tasksRepo from '../tasks/task-memory-repository';

const getAll = async (): Promise<IUserResponse> => usersRepo.getAll();

const get = async (id: string): Promise<IUserResponse> => usersRepo.get(id);

const create = async (props: {
  name: string;
  login: string;
  password: string;
}): Promise<IUserResponse> => {
  const { name, login, password } = props;

  const newUser = new User({
    name,
    login,
    password,
  });

  return usersRepo.create(newUser);
};

const put = async (props: {
  id: string;
  name: string;
  login: string;
  password: string;
}): Promise<IUserResponse> => {
  const { id, name, login, password } = props;
  const result = await get(id);

  if (result.statusCode !== 200) {
    return result;
  }

  const newUser = new User({
    id,
    name,
    login,
    password,
  });

  return usersRepo.update({ id, newUser });
};

const del = async (id: string): Promise<IUserResponse> => {
  const result = await get(id);

  if (result.statusCode !== 200) {
    return result;
  }
  
  await tasksRepo.resetUserId(id);

  return usersRepo.del(id);
};

export { getAll, get, create, put, del };

import { IUserToResponse } from '../../common/interfaces';
import * as usersRepo from './user-memory-repository';
import User from './user-model';
import * as tasksRepo from '../tasks/task-memory-repository';

const getAll = async (): Promise<IUserToResponse[]> => {
  const users = await usersRepo.getAll();

  return users.map((user) => User.toResponse(user));
};

const get = async (id: string): Promise<IUserToResponse> => {
  const user = await usersRepo.get(id);

  return User.toResponse(user);
};

const create = async (props: { name: string; login: string; password: string; }): Promise<IUserToResponse> => {
  const { name, login, password } = props;

  const newUser = new User({
    name,
    login,
    password,
  });

  const user = await usersRepo.create(newUser);

  return User.toResponse(user);
};

const put = async (props: { id: string; name: string; login: string; password: string; }): Promise<IUserToResponse> => {
  const { id, name, login, password } = props;

  await get(id);

  const newUser = new User({
    id,
    name,
    login,
    password,
  });

  const user = await usersRepo.update({ id, newUser });

  return User.toResponse(user);
};

const del = async (id: string): Promise<boolean> => {
  await get(id);
  await tasksRepo.resetUserId(id);

  return usersRepo.del(id);
};

export { getAll, get, create, put, del };

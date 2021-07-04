import StatusCodes from 'http-status-codes';
import { hashByPassword } from '../../utils-crypto/hash-helper';
import { IUserResponse, ITaskResponse, IUserBodyParser } from '../../common/interfaces';
import * as usersRepo from './user-db-repository';

const { OK } = StatusCodes;

const getAll = async (): Promise<IUserResponse> => usersRepo.getAll();

const get = async (id: string): Promise<IUserResponse> => usersRepo.get(id);

const getUserByLogin = async (login: string): Promise<IUserResponse> => usersRepo.getUser(login);

const create = async (props: IUserBodyParser): Promise<IUserResponse> => {
  const { password } = props;

  const hashedPassword = await hashByPassword(password);
  const newUser = { ...props, password: hashedPassword };

  return usersRepo.create(newUser);
};

const put = async (props: IUserBodyParser): Promise<IUserResponse> => {
  const { id } = props;
  const searchResultUser = await get(<string>id);

  if (searchResultUser.statusCode !== OK) {
    return searchResultUser;
  }

  const { password } = props;

  const hashedPassword = password !== undefined ? await hashByPassword(password) : null;
  const updateUser =
    hashedPassword === null ? { ...props } : { ...props, password: hashedPassword };

  return usersRepo.update(updateUser);
};

const del = async (id: string): Promise<IUserResponse | ITaskResponse> => {
  const result = await get(id);

  if (result.statusCode !== OK) {
    return result;
  }

  return usersRepo.del(id);
};

export { getAll, get, create, put, del, getUserByLogin };

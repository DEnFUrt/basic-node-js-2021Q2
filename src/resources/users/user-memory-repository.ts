import * as DB from '../../common/inTempUserDB';
import { IUser } from '../../common/interfaces';

const getAll = async (): Promise<IUser[]> => {
  const result = DB.getAllUsers();

  return result;
};

const get = async (id: string): Promise<IUser> => {
  const result = DB.getUser(id);

  if (result === null) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return result;
};

const create = async (newUser: IUser): Promise<IUser> => {
  const result = DB.createUser(newUser);

  if (result === null) {
    throw new Error(`The user was not created`);
  }

  return result;
};

const update = async (props: { id: string; newUser: IUser }): Promise<IUser> => {
  const { id } = props;
  const result = DB.updateUser(props);

  if (result === null) {
    throw new Error(`The user with id: ${id} was not updated`);
  }

  return result;
};

const del = async (id: string): Promise<boolean> => {
  const result = DB.delUser(id);

  if (result === null) {
    throw new Error(`The user with id: ${id} was not deleted`);
  }

  return result;
};

export { getAll, get, create, update, del };

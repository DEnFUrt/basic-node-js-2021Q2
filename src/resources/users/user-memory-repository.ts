import StatusCodes from 'http-status-codes';
import * as DB from '../../common/inTempUserDB';
import { IUser } from '../../common/interfaces';
import HttpError from '../../utils/error-http';

const getAll = async (): Promise<IUser[]> => {
  const result = DB.getAllUsers();

  return result;
};

const get = async (id: string): Promise<IUser> => {
  const result = DB.getUser(id);

  if (result === null) {
    throw new HttpError({
      message: `User not found: The user with id: ${id} was not found`,
      status: `${StatusCodes.NOT_FOUND}`,
    });
  }

  return result;
};

const create = async (newUser: IUser): Promise<IUser> => {
  const result = DB.createUser(newUser);

  if (result === null) {
    throw new HttpError({
      message: `Bad request: The user was not created./n With params: ${JSON.stringify(newUser)}`,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }

  return result;
};

const update = async (props: { id: string; newUser: IUser }): Promise<IUser> => {
  const { id } = props;
  const result = DB.updateUser(props);

  if (result === null) {
    throw new HttpError({
      message: `Bad request: The user with id: ${id} was not updated./n With params: ${JSON.stringify(props)}`,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }

  return result;
};

const del = async (id: string): Promise<boolean> => {
  const result = DB.delUser(id);

  if (result === null) {
    throw new HttpError({
      message: `User not found: The user with id: ${id} was not deleted`,
      status: `${StatusCodes.NOT_FOUND}`,
    });
  }

  return result;
};

export { getAll, get, create, update, del };

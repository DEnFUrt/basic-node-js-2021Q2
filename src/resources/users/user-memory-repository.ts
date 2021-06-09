import StatusCodes from 'http-status-codes';
import * as DB from '../../common/inTempUserDB';
import User from './user-model';
import { IUser, IUserResponse } from '../../common/interfaces';

const getAll = async (): Promise<IUserResponse> => {
  const users = DB.getAllUsers();
  const result = users.map((user) => User.toResponse(user));

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const get = async (id: string): Promise<IUserResponse> => {
  const user = DB.getUser(id);

  if (user === null) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      sendMessage: `User not found: The user with id: ${id} was not found`,
    };
  }

  const result = User.toResponse(user);

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const create = async (newUser: IUser): Promise<IUserResponse> => {
  const user = DB.createUser(newUser);

  if (user === null) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Bad request: The user was not created. /n With params: ${JSON.stringify(
        newUser,
      )}`,
    };
  }

  const result = User.toResponse(user);

  return { statusCode: StatusCodes.CREATED, sendMessage: result };
};

const update = async (props: { id: string; newUser: IUser }): Promise<IUserResponse> => {
  const { id } = props;
  const user = DB.updateUser(props);

  if (user === null) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Bad request: The user with id: ${id} was not updated. /n With params: ${JSON.stringify(
        props,
      )}`,
    };
  }

  const result = User.toResponse(user);

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const del = async (id: string): Promise<IUserResponse> => {
  const result = DB.delUser(id);

  if (result === null) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      sendMessage: `User not found: The user with id: ${id} was not deleted`,
    };
  }

  return { statusCode: StatusCodes.NO_CONTENT, sendMessage: 'The user has been deleted' };
};

export { getAll, get, create, update, del };

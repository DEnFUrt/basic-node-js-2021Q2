import StatusCodes from 'http-status-codes';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { IUser, IUserResponse, IUserToResponse, IUserBodyParser } from '../../common/interfaces';

const { NOT_FOUND, OK, BAD_REQUEST, CREATED, NO_CONTENT } = StatusCodes;

const toResponse = (user: IUser): IUserToResponse => {
    const { id, name, login } = user;
    return { id, name, login };
};

const getAll = async (): Promise<IUserResponse> => {
  const users = await getRepository(User).find();
  const result = users.map((user: IUser) => toResponse(user));

  return { statusCode: OK, sendMessage: result };
};

const get = async (id: string): Promise<IUserResponse> => {
    const user = await getRepository(User).findOne(id);

  if (user === undefined) {
    return {
      statusCode: NOT_FOUND,
      sendMessage: `User not found: The user with id: ${id} was not found`,
    };
  }

  const result = toResponse(user);

  return { statusCode: OK, sendMessage: result };
};

const create = async (newUser: IUserBodyParser): Promise<IUserResponse> => {
  const user = getRepository(User).create(newUser);
  const savedUser = await getRepository(User).save(user);

  if (savedUser === undefined) {
    return {
      statusCode: BAD_REQUEST,
      sendMessage: `Bad request: The user was not created. /n With params: ${JSON.stringify(
        newUser,
      )}`,
    };
  }

  const result = toResponse(savedUser);

  return { statusCode: CREATED, sendMessage: result };
};

const update = async (props: IUserBodyParser): Promise<IUserResponse> => {
  const { id } = props;

const savedUser = await getRepository(User).save(props);
  
  if (savedUser === undefined) {
    return {
      statusCode: BAD_REQUEST,
      sendMessage: `Bad request: The user with id: ${<string>id} was not updated. /n With params: ${JSON.stringify(
        props,
      )}`,
    };
  }

  const result = toResponse(savedUser);

  return { statusCode: OK, sendMessage: result };
};

const del = async (id: string): Promise<IUserResponse> => {
  const result = await getRepository(User).delete(id);
  
  if (!result.affected) {
    return {
      statusCode: NOT_FOUND,
      sendMessage: `User not found: The user with id: ${id} was not deleted`,
    };
  }

  return { statusCode: NO_CONTENT, sendMessage: 'The user has been deleted' };
};

export { getAll, get, create, update, del };

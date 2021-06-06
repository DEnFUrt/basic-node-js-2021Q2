import { v4 as uuid } from 'uuid';
import { IUserToResponse, IUser } from '../../common/interfaces';

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({ id = uuid(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;

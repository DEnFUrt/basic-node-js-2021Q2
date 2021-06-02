import { IUser } from './interfaces';

const DB: IUser[] = [];

const getAllUsers = (): IUser[] => DB;

const getUser = (id: string): IUser | null => {
  const user = DB.find((item) => item.id === id);

  return user || null;
};

const createUser = (newUser: IUser): IUser | null => {
  try {
    DB.push(newUser);

    return newUser;
  } catch {
    return null;
  };
};

const updateUser = (props: { id: string; newUser: IUser; }): IUser | null => {
  const { id, newUser } = props;

  const searchIndexUser = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexUser, 1, newUser);

    return newUser;
  } catch {
    return null;
  };
};

const delUser = (id: string): boolean | null => {
  const searchIndexUser = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexUser, 1);

    return true;
  } catch {
    return null;
  };
};

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  delUser,
};

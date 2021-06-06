interface IUserToResponse {
  id: string;
  name: string;
  login: string;
}

interface IUser extends IUserToResponse {
  password: string;
}

interface IUserBodyParser {
  id?: string;
  password: string;
  name: string;
  login: string;
}

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IBoardBodyParser {
  id?: string;
  title: string;
  columns: IColumn[];
}

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

interface ITaskBodyParser {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export {
  IUserToResponse,
  IUser,
  IUserBodyParser,
  IBoard,
  IColumn,
  IBoardBodyParser,
  ITask,
  ITaskBodyParser,
};

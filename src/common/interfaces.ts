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

interface IUserResponse {
  statusCode: number;
  sendMessage: IUserToResponse | IUserToResponse[] | string;
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

interface IBoardResponse {
  statusCode: number;
  sendMessage: IBoard | IBoard[] | string;
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

interface IJsonMessage {
  Info?: string;
  Error?: string;
  message?: string;
  method?: string;
  statusCode?: number;
  url?: string;
  ms?: number;
  status?: string;
  stack?: string;
}



export {
  IUserToResponse,
  IUser,
  IUserBodyParser,
  IUserResponse,
  IBoard,
  IColumn,
  IBoardBodyParser,
  ITask,
  ITaskBodyParser,
  IJsonMessage,
  IBoardResponse,
};

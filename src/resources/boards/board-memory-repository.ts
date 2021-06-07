import StatusCodes from 'http-status-codes';
import * as DB from '../../common/inTempBoardDB';
import { IBoard } from '../../common/interfaces';
import HttpError from '../../utils/error-http';

const getAll = async (): Promise<IBoard[]> => {
  const result = DB.getAllBoards();

  return result;
};

const get = async (id: string): Promise<IBoard> => {
  const result = DB.getBoard(id);

  if (result === null) {
    throw new HttpError({
      message: `Board not found: The board with id: ${id} was not found`,
      status: `${StatusCodes.NOT_FOUND}`,
    });
  }

  return result;
};

const create = async (newBoard: IBoard): Promise<IBoard> => {
  const result = DB.createBoard(newBoard);

  if (result === null) {
    throw new HttpError({
      message: `Bad request: The board was not created./n With params: ${JSON.stringify(newBoard)}`,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }

  return result;
};

const update = async (props: { id: string; newBoard: IBoard }): Promise<IBoard> => {
  const { id } = props;
  const result = DB.updateBoard(props);

  if (result === null) {
    throw new HttpError({
      message: `Bad request: The board with id: ${id} was not updated./n With params: ${JSON.stringify(props)}`,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }

  return result;
};

const del = async (id: string): Promise<boolean> => {
  const result = DB.delBoard(id);

  if (result === null) {
    throw new HttpError({
      message: `Board not found: The board with id: ${id} was not deleted`,
      status: `${StatusCodes.NOT_FOUND}`,
    });
  }

  return result;
};

export { getAll, get, create, update, del };

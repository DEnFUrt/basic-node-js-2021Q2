import * as DB from '../../common/inTempBoardDB';
import { IBoard } from '../../common/interfaces';

const getAll = async (): Promise<IBoard[]> => {
  const result = DB.getAllBoards();

  return result;
};

const get = async (id: string): Promise<IBoard> => {
  const result = DB.getBoard(id);

  if (result === null) {
    throw new Error(`The board with id: ${id} was not found`);
  };

  return result;
};

const create = async (newBoard: IBoard): Promise<IBoard> => {
  const result = DB.createBoard(newBoard);

  if (result === null) {
    throw new Error(`The board was not created`);
  };

  return result;
};

const update = async (props: { id: string; newBoard: IBoard; }): Promise<IBoard> => {
  const { id } = props;
  const result = DB.updateBoard(props);

  if (result === null) {
    throw new Error(`The board with id: ${id} was not updated`);
  };

  return result;
};

const del = async (id: string): Promise<boolean> => {
  const result = DB.delBoard(id);

  if (result === null) {
    throw new Error(`The board with id: ${id} was not deleted`);
  };

  return result;
};

export {
  getAll,
  get,
  create,
  update,
  del,
};

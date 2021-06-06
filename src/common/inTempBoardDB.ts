import { IBoard } from './interfaces';

const DB: IBoard[] = [];

const getAllBoards = (): IBoard[] => DB;

const getBoard = (id: string): IBoard | null => {
  const board = DB.find((item) => item.id === id);

  return board || null;
};

const createBoard = (newBoard: IBoard): IBoard | null => {
  try {
    DB.push(newBoard);

    return newBoard;
  } catch {
    return null;
  }
};

const updateBoard = (props: { id: string; newBoard: IBoard }): IBoard | null => {
  const { id, newBoard } = props;

  const searchIndexBoard = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexBoard, 1, newBoard);

    return newBoard;
  } catch {
    return null;
  }
};

const delBoard = (id: string): boolean | null => {
  const searchIndexBoard = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexBoard, 1);

    return true;
  } catch {
    return null;
  }
};

export { getAllBoards, getBoard, createBoard, updateBoard, delBoard };

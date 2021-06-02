import { IBoard, IColumn } from '../../common/interfaces';
import * as boardsRepo from './board-memory-repository';
import Board from './board-model';
import * as tasksRepo from '../tasks/task-memory-repository';

const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

const get = async (id: string): Promise<IBoard> => boardsRepo.get(id);

const create = (props: { title: string; columns: IColumn[]; }): Promise<IBoard> => {
  const { title, columns } = props;

  const newBoard = new Board({
    title,
    columns,
  });

  return boardsRepo.create(newBoard);
};

const put = async (props: { id: string; title: string; columns: IColumn[]; }): Promise<IBoard> => {
  const { id, title, columns } = props;

  await get(id);

  const newBoard = new Board({
    id,
    title,
    columns,
  });

  return boardsRepo.update({ id, newBoard });
};

const del = async (id: string): Promise<boolean> => {
  await get(id);
  await tasksRepo.delByBoradId(id);

  return boardsRepo.del(id);
};

export { getAll, get, create, put, del };

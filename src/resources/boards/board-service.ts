import { IColumn, IBoardResponse } from '../../common/interfaces';
import * as boardsRepo from './board-memory-repository';
import Board from './board-model';
import * as tasksRepo from '../tasks/task-memory-repository';

const getAll = (): Promise<IBoardResponse> => boardsRepo.getAll();

const get = async (id: string): Promise<IBoardResponse> => boardsRepo.get(id);

const create = (props: { title: string; columns: IColumn[] }): Promise<IBoardResponse> => {
  const { title, columns } = props;

  const newBoard = new Board({
    title,
    columns,
  });

  return boardsRepo.create(newBoard);
};

const put = async (props: { id: string; title: string; columns: IColumn[] }): Promise<IBoardResponse> => {
  const { id, title, columns } = props;
  const result = await get(id);

  if (result.statusCode !== 200) {
    return result;
  }

  const newBoard = new Board({
    id,
    title,
    columns,
  });

  return boardsRepo.update({ id, newBoard });
};

const del = async (id: string): Promise<IBoardResponse> => {
  const result = await get(id);

  if (result.statusCode !== 200) {
    return result;
  }

  await tasksRepo.delByBoradId(id);

  return boardsRepo.del(id);
};

export { getAll, get, create, put, del };

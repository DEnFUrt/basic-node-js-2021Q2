import StatusCodes from 'http-status-codes';
import { ITaskResponse, IBoardResponse, ITaskBodyParser } from '../../common/interfaces';
import * as tasksRepo from './task-db-repository';
import * as boardsRepo from '../boards/board-db-repository';

const { OK } = StatusCodes;

const getAllByBoardId = (boardId: string): Promise<ITaskResponse> =>
  tasksRepo.getAllByBoardId(boardId);

const getByBoardId = (props: { boardId: string; taskId: string }): Promise<ITaskResponse> =>
  tasksRepo.getByBoardId(props);

const create = async (props: ITaskBodyParser): Promise<ITaskResponse | IBoardResponse> => {
  const { boardId } = props;
  const resultGetBoard = await boardsRepo.get(boardId);

  if (resultGetBoard.statusCode !== OK) {
    return resultGetBoard;
  }

  return tasksRepo.create(props);
};

const put = async (props: {
  taskId: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}): Promise<ITaskResponse> => {
  const { taskId, boardId } = props;
  const result = await getByBoardId({ boardId, taskId });

  if (result.statusCode !== OK) {
    return result;
  }

  return tasksRepo.update(props);
};

const del = async (props: { boardId: string; taskId: string }): Promise<ITaskResponse> => {
  const { boardId, taskId } = props;
  const result = await getByBoardId({ boardId, taskId });

  if (result.statusCode !== OK) {
    return result;
  }

  return tasksRepo.del({ boardId, taskId });
};

export { getAllByBoardId, getByBoardId, create, put, del };

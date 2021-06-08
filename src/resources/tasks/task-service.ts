import StatusCodes from 'http-status-codes';
import { ITaskResponse, IBoardResponse } from '../../common/interfaces';
import * as tasksRepo from './task-memory-repository';
import Task from './task-model';
import * as boardsRepo from '../boards/board-memory-repository';

const getAllByBoardId = (boardId: string): Promise<ITaskResponse> =>
  tasksRepo.getAllByBoardId(boardId);

const getByBoardId = (props: { boardId: string; taskId: string }): Promise<ITaskResponse> =>
  tasksRepo.getByBoardId(props);

const create = async (props: {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}): Promise<ITaskResponse | IBoardResponse> => {
  const { title, order, description, userId, boardId, columnId } = props;
  const result = await boardsRepo.get(boardId);

  if (result.statusCode !== StatusCodes.OK) {
    return result;
  }

  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  return tasksRepo.create(newTask);
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
  const { taskId, title, order, description, userId, boardId, columnId } = props;
  const result = await getByBoardId({ boardId, taskId });

  if (result.statusCode !== StatusCodes.OK) {
    return result;
  }

  const newTask = new Task({
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  return tasksRepo.update({ boardId, taskId, newTask });
};

const del = async (props: { boardId: string; taskId: string }): Promise<ITaskResponse> => {
  const { boardId, taskId } = props;
  const result = await getByBoardId({ boardId, taskId });

  if (result.statusCode !== StatusCodes.OK) {
    return result;
  }

  return tasksRepo.del({ boardId, taskId });
};

export { getAllByBoardId, getByBoardId, create, put, del };

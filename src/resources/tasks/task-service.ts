import { ITask } from '../../common/interfaces';
import * as tasksRepo from './task-memory-repository';
import Task from './task-model';
import * as boardsRepo from '../boards/board-memory-repository';

const getAllByBoardId = (boardId: string): Promise<ITask[]> => tasksRepo.getAllByBoardId(boardId);

const getByBoardId = (props: { boardId: string; taskId: string }): Promise<ITask> =>
  tasksRepo.getByBoardId(props);

const create = async (props: {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}): Promise<ITask> => {
  const { title, order, description, userId, boardId, columnId } = props;

  await boardsRepo.get(boardId);

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
}): Promise<ITask> => {
  const { taskId, title, order, description, userId, boardId, columnId } = props;

  await getByBoardId({ boardId, taskId });

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

const del = async (props: { boardId: string; taskId: string }): Promise<boolean> => {
  const { boardId, taskId } = props;

  await getByBoardId({ boardId, taskId });

  return tasksRepo.del({ boardId, taskId });
};

export { getAllByBoardId, getByBoardId, create, put, del };

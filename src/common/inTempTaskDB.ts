import { ITask } from './interfaces';

let DB: ITask[] = [];

const getAllTasks = (boardId: string): ITask[] => {
  const tasks = DB.filter((item) => item.boardId === boardId);

  return tasks;
};

const getTask = (props: { boardId: string; taskId: string }): ITask | null => {
  const { boardId, taskId } = props;

  try {
    const task = DB.find((item) => item.id === taskId && item.boardId === boardId);
    return task || null;
  } catch {
    return null;
  }
};

const createTask = (newTask: ITask): ITask | null => {
  try {
    DB.push(newTask);

    return newTask;
  } catch {
    return null;
  }
};

const updateTask = (props: { boardId: string; taskId: string; newTask: ITask }): ITask | null => {
  const { boardId, taskId, newTask } = props;

  const searchIndexTask = DB.findIndex((item) => item.id === taskId && item.boardId === boardId);

  try {
    DB.splice(searchIndexTask, 1, newTask);

    return newTask;
  } catch {
    return null;
  }
};

const delTask = (props: { boardId: string; taskId: string }): boolean | null => {
  const { boardId, taskId } = props;

  const searchIndexTask = DB.findIndex((item) => item.id === taskId && item.boardId === boardId);

  try {
    DB.splice(searchIndexTask, 1);

    return true;
  } catch {
    return null;
  }
};

const delTaskByBoardId = (boardId: string): boolean | null => {
  try {
    DB = DB.filter((item) => item.boardId !== boardId);

    return true;
  } catch {
    return null;
  }
};

const resetUserIdInTasks = (userId: string): boolean | null => {
  try {
    DB = DB.map((item) => (item.userId === userId ? { ...item, userId: null } : { ...item }));

    return true;
  } catch {
    return null;
  }
};

export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  delTaskByBoardId,
  delTask,
  resetUserIdInTasks,
};

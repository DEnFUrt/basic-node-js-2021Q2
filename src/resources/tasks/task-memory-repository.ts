import StatusCodes from 'http-status-codes';
import * as DB from '../../common/inTempTaskDB';
import { ITask } from '../../common/interfaces';
import HttpError from '../../utils/error-http';

const getAllByBoardId = async (boardId: string): Promise<ITask[]> => {
  const result = DB.getAllTasks(boardId);

  return result;
};

const getByBoardId = async (props: { taskId: string; boardId: string }): Promise<ITask> => {
  const { taskId, boardId } = props;

  const result = DB.getTask(props);

  if (result === null) {
    throw new HttpError({
      message: `Task not found: The task with id: ${taskId} for board with id: ${boardId} was not found`,
      status: `${StatusCodes.NOT_FOUND}`,
    });
  }

  return result;
};

const create = async (newTask: ITask): Promise<ITask> => {
  const result = DB.createTask(newTask);

  if (result === null) {
    throw new HttpError({
      message: `Bad request: The task was not created./n With params: ${JSON.stringify(newTask)}`,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }

  return result;
};

const update = async (props: {
  boardId: string;
  taskId: string;
  newTask: ITask;
}): Promise<ITask> => {
  const { boardId, taskId } = props;

  await getByBoardId({ boardId, taskId });

  const result = DB.updateTask(props);

  if (result === null) {
    throw new HttpError({
      message: `Bad request: The task with id: ${taskId} for board with id: ${boardId} was not updated./n With params: ${JSON.stringify(props)}`,
      status: `${StatusCodes.BAD_REQUEST}`,
    });
  }

  return result;
};

const del = async (props: { boardId: string; taskId: string }): Promise<boolean> => {
  const { boardId, taskId } = props;

  const result = DB.delTask(props);

  if (result === null) {
    throw new HttpError({
      message: `Task not found: The task with id: ${taskId} for board with id: ${boardId} was not deleted`,
      status: `${StatusCodes.NOT_FOUND}`,
    });
  }

  return result;
};

const delByBoradId = async (boardId: string): Promise<boolean> => {
  const result = DB.delTaskByBoardId(boardId);

  if (result === null) {
    throw new HttpError({
      message: `The tasks by board with id: ${boardId} was not deleted`,
      status: `${StatusCodes.UNPROCESSABLE_ENTITY}`,
    });
  }

  return result;
};

const resetUserId = async (userId: string): Promise<boolean> => {
  const result = DB.resetUserIdInTasks(userId);

  if (result === null) {
    throw new HttpError({
      message: `Tasks where User with id: ${userId} is assignee should be was not updated`,
      status: `${StatusCodes.UNPROCESSABLE_ENTITY}`,
    });
  }

  return result;
};

export { getAllByBoardId, getByBoardId, create, update, del, delByBoradId, resetUserId };

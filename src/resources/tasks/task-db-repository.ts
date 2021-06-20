import StatusCodes from 'http-status-codes';
import { getRepository } from 'typeorm';
import { Task } from '../entity/task';
import { ITaskBodyParser, ITaskResponse } from '../../common/interfaces';

const { NOT_FOUND, OK, CREATED, NO_CONTENT } = StatusCodes;

const getAllByBoardId = async (boardId: string): Promise<ITaskResponse> => {
  const result = await getRepository(Task).find({ boardId });

  return { statusCode: OK, sendMessage: result };
};

const getByBoardId = async (props: { taskId: string; boardId: string }): Promise<ITaskResponse> => {
  const { taskId, boardId } = props;
  const result = await getRepository(Task).findOne({id: taskId, boardId});

  if (result === undefined) {
    return {
      statusCode: NOT_FOUND,
      sendMessage: `Task not found: The task with id: ${taskId} for board with id: ${boardId} was not found`,
    };
  }

  return { statusCode: OK, sendMessage: result };
};

const create = async (newTask: ITaskBodyParser): Promise<ITaskResponse> => {
  const task = getRepository(Task).create(newTask);
  const savedTask = await getRepository(Task).save(task);

  return { statusCode: CREATED, sendMessage: savedTask };
};

const update = async (props: {
  taskId: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}): Promise<ITaskResponse> => {
  const { taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId } = props;
  const newTask = {
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };

  const savedTask = await getRepository(Task).save(newTask);

  return { statusCode: OK, sendMessage: savedTask };
};

const del = async (props: { boardId: string; taskId: string }): Promise<ITaskResponse> => {
  const { boardId, taskId } = props;
  const result = await getRepository(Task).delete({id: taskId, boardId});

  if (!result.affected) {
    return {
      statusCode: NOT_FOUND,
      sendMessage: `Task not found: The task with id: ${taskId} for board with id: ${boardId} was not deleted`,
    };
  }

  return { statusCode: NO_CONTENT, sendMessage: 'The task has been deleted' };
};

const delTaskByBoradId = async (boardId: string): Promise<ITaskResponse> => {
  const result = await getRepository(Task).delete({ boardId });
  const delTaskCount = !result.affected ? 0 : result.affected;

  return {
    statusCode: OK,
    sendMessage: `Removed tasks for boards with ID: ${boardId} in the amount - ${delTaskCount} pcs.`,
  };
};

const nullifyUserId = async (userId: string): Promise<ITaskResponse> => {
  const result = await getRepository(Task).update({ userId }, { userId: null });
  const nullifyUserTaskCount = !result.affected ? 0 : result.affected;

  return {
    statusCode: OK,
    sendMessage: `Tasks where User with id: ${userId} has been nullify in the amount - ${nullifyUserTaskCount} pcs.`,
  };
};

export { getAllByBoardId, getByBoardId, create, update, del , delTaskByBoradId, nullifyUserId };

import StatusCodes from 'http-status-codes';
import { getRepository } from 'typeorm';
import { Task } from '../entity/task';
import { ITaskBodyParser, ITaskResponse } from '../../common/interfaces';

const { NOT_FOUND, OK, BAD_REQUEST, CREATED, NO_CONTENT,/*  UNPROCESSABLE_ENTITY */ } = StatusCodes;

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

  if (savedTask === undefined) {
    return {
      statusCode: BAD_REQUEST,
      sendMessage: `Bad request: The task was not created. /n With params: ${JSON.stringify(
        newTask,
      )}`,
    };
  }

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

  if (savedTask === undefined) {
    return {
      statusCode: BAD_REQUEST,
      sendMessage: `Bad request: The task with id: ${taskId} for board with id: ${boardId} was not updated. /n With params: ${JSON.stringify(
        props,
      )}`,
    };
  }

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

/* const delByBoradId = async (boardId: string): Promise<ITaskResponse> => {
  const result = DB.delTaskByBoardId(boardId);

  if (result === null) {
    return {
      statusCode: UNPROCESSABLE_ENTITY,
      sendMessage: `The tasks by board with id: ${boardId} was not deleted`,
    };
  }

  return {
    statusCode: NO_CONTENT,
    sendMessage: `The tasks by board with id: ${boardId} has been deleted`,
  };
};

const resetUserId = async (userId: string): Promise<ITaskResponse> => {
  const result = DB.resetUserIdInTasks(userId);

  if (result === null) {
    return {
      statusCode: UNPROCESSABLE_ENTITY,
      sendMessage: `Tasks where User with id: ${userId} is assignee should be was not updated`,
    };
  }

  return {
    statusCode: NO_CONTENT,
    sendMessage: `Tasks where User with id: ${userId} has been deleted`,
  };
}; */

export { getAllByBoardId, getByBoardId, create, update, del/* , delByBoradId, resetUserId */ };

import StatusCodes from 'http-status-codes';
import * as DB from '../../common/inTempTaskDB';
import { ITask, ITaskResponse } from '../../common/interfaces';

const getAllByBoardId = async (boardId: string): Promise<ITaskResponse> => {
  const result = DB.getAllTasks(boardId);

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const getByBoardId = async (props: { taskId: string; boardId: string }): Promise<ITaskResponse> => {
  const { taskId, boardId } = props;
  const result = DB.getTask(props);

  if (result === null) {
    return { 
      statusCode: StatusCodes.NOT_FOUND,
      sendMessage: `Task not found: The task with id: ${taskId} for board with id: ${boardId} was not found`
    };
  }

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const create = async (newTask: ITask): Promise<ITaskResponse> => {
  const result = DB.createTask(newTask);

  if (result === null) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Bad request: The task was not created. /n With params: ${JSON.stringify(newTask)}`
    };
  }

  return { statusCode: StatusCodes.CREATED, sendMessage: result };
};

const update = async (props: {
  boardId: string;
  taskId: string;
  newTask: ITask;
}): Promise<ITaskResponse> => {
  const { boardId, taskId } = props;
  const resSearchTask = await getByBoardId({ boardId, taskId });

  if (resSearchTask.statusCode !== 200) {
    return resSearchTask;
  }

  const result = DB.updateTask(props);

  if (result === null) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Bad request: The task with id: ${taskId} for board with id: ${boardId} was not updated. /n With params: ${JSON.stringify(props)}`
    };    
  }

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const del = async (props: { boardId: string; taskId: string }): Promise<ITaskResponse> => {
  const { boardId, taskId } = props;
  const result = DB.delTask(props);

  if (result === null) {
    return { 
      statusCode: StatusCodes.NOT_FOUND,
      sendMessage: `Task not found: The task with id: ${taskId} for board with id: ${boardId} was not deleted`
    };    
  }

  return { statusCode: StatusCodes.NO_CONTENT, sendMessage: 'The task has been deleted' };
};

const delByBoradId = async (boardId: string): Promise<ITaskResponse> => {
  const result = DB.delTaskByBoardId(boardId);

  if (result === null) {
    return { 
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      sendMessage: `The tasks by board with id: ${boardId} was not deleted`
    };    
  }

  return { statusCode: StatusCodes.NO_CONTENT, sendMessage: `The tasks by board with id: ${boardId} has been deleted` };
};

const resetUserId = async (userId: string): Promise<ITaskResponse> => {
  const result = DB.resetUserIdInTasks(userId);

  if (result === null) {
    return { 
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      sendMessage: `Tasks where User with id: ${userId} is assignee should be was not updated`
    };    
  }

  return { statusCode: StatusCodes.NO_CONTENT, sendMessage: `Tasks where User with id: ${userId} has been deleted` };
};

export { getAllByBoardId, getByBoardId, create, update, del, delByBoradId, resetUserId };

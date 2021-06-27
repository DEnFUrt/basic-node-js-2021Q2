import StatusCodes from 'http-status-codes';
import { IBoardResponse, IBoardBodyParser, ITaskResponse } from '../../common/interfaces';
import * as boardsRepo from './board-db-repository';
import * as tasksRepo from '../tasks/task-db-repository';
import * as logger from '../../logger/logger';

const { OK } = StatusCodes;

const getAll = (): Promise<IBoardResponse> => boardsRepo.getAll();

const get = async (id: string): Promise<IBoardResponse> => boardsRepo.get(id);

const create = (props: IBoardBodyParser): Promise<IBoardResponse> => boardsRepo.create(props);

const put = async (props: IBoardBodyParser): Promise<IBoardResponse> => {
  const { id } = props;
  const searchResultBoard = await get(<string>id);

  if (searchResultBoard.statusCode !== OK) {
    return searchResultBoard;
  }

  return boardsRepo.update(props);
};

const del = async (id: string): Promise<IBoardResponse | ITaskResponse> => {
  const result = await get(id);

  if (result.statusCode !== OK) {
    return result;
  }

  const resDelTaskByBoradId = await tasksRepo.delTaskByBoradId(id);
  const { statusCode, sendMessage } = resDelTaskByBoradId;

  if (statusCode === OK && typeof sendMessage === 'string') {
    logger.serverInfo(sendMessage);
  }

  return boardsRepo.del(id);
};

export { getAll, get, create, put, del };

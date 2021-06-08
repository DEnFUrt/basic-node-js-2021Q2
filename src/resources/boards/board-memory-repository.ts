import StatusCodes from 'http-status-codes';
import * as DB from '../../common/inTempBoardDB';
import { IBoard, IBoardResponse } from '../../common/interfaces';

const getAll = async (): Promise<IBoardResponse> => {
  const result = DB.getAllBoards();

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const get = async (id: string): Promise<IBoardResponse> => {
  const result = DB.getBoard(id);
  
  if (result === null) {
    return { 
      statusCode: StatusCodes.NOT_FOUND,
      sendMessage: `Board not found: The board with id: ${id} was not found`
    };
  }

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const create = async (newBoard: IBoard): Promise<IBoardResponse> => {
  const result = DB.createBoard(newBoard);

  if (result === null) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Bad request: The board was not created./n With params: ${JSON.stringify(newBoard)}`
    };    
  }

  return { statusCode: StatusCodes.CREATED, sendMessage: result };
};

const update = async (props: { id: string; newBoard: IBoard }): Promise<IBoardResponse> => {
  const { id } = props;
  const result = DB.updateBoard(props);

  if (result === null) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Bad request: The board with id: ${id} was not updated./n With params: ${JSON.stringify(props)}`
    };    
  }

  return { statusCode: StatusCodes.OK, sendMessage: result };
};

const del = async (id: string): Promise<IBoardResponse> => {
  const result = DB.delBoard(id);

  if (result === null) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      sendMessage: `Board not found: The board with id: ${id} was not deleted`
    };    
  }

  return { statusCode: StatusCodes.NO_CONTENT, sendMessage: 'The board has been deleted' };
};

export { getAll, get, create, update, del };

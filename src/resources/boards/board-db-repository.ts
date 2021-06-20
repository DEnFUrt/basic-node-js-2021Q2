import StatusCodes from 'http-status-codes';
import { getRepository } from 'typeorm';
import { Board } from '../entity/board';
import { Columns } from '../entity/column';
import { IBoardBodyParser, IBoardResponse } from '../../common/interfaces';

const { NOT_FOUND, OK, CREATED, NO_CONTENT } = StatusCodes;

const getAll = async (): Promise<IBoardResponse> => {
    const result = await getRepository(Board).find({ relations: [ 'columns' ] });
  
    return { statusCode: OK, sendMessage: result };
  };
  
const get = async (id: string): Promise<IBoardResponse> => {
  const result = await getRepository(Board).findOne(id, { relations: [ 'columns' ] });
  
    if (result === undefined) {
      return {
        statusCode: NOT_FOUND,
        sendMessage: `Board not found: The board with id: ${id} was not found`,
      };
    }
  
    return { statusCode: OK, sendMessage: result };
  };
  
  const create = async (props: IBoardBodyParser): Promise<IBoardResponse> => {
    const columns = getRepository(Columns).create(props.columns);
    await getRepository(Columns).save(columns);

    const board = getRepository(Board).create({...props, columns});
    const savedBoard = await getRepository(Board).save(board);
    
    return { statusCode: CREATED, sendMessage: savedBoard };
  };

  const update = async (props: IBoardBodyParser): Promise<IBoardResponse> => {
    const savedBoard = await getRepository(Board).save(props);
  
    return { statusCode: OK, sendMessage: savedBoard };
  };

  const del = async (id: string): Promise<IBoardResponse> => {
    const result = await getRepository(Board).delete(id);
  
    if (!result.affected) {
      return {
        statusCode: NOT_FOUND,
        sendMessage: `Board not found: The board with id: ${id} was not deleted`,
      };
    }
  
    return { statusCode: NO_CONTENT, sendMessage: 'The board has been deleted' };
  }; 
  
  export { getAll, get, create,  update, del };
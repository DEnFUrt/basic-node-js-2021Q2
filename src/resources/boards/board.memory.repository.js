const DB = require('../../common/inTempBoardDB');

const getAll = async () => {
  const boards = await DB.getAllBoards();

  return boards;
};

const get = async id => {
  const board = await DB.getBoard(id);

  if (board === null) {
    throw new Error(`The board with id: ${id} was not found`);
  }

  return board;
};

const create = async newBoard => {
  const result = DB.createBoard(newBoard);

  if (result === null) {
    throw new Error(`The board was not created`);
  };

  return result;
};

const update = async props => {
  const { id } = props;
  const result = await DB.updateBoard(props);

  if (result === null) {
    throw new Error(`The board with id: ${id} was not updated`);
  };

  return result;
};

const del = async id => {
  const result = await DB.delBoard(id);

  if (result === null) {
    throw new Error(`The board with id: ${id} was not deleted`);
  };

  return result;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  del
};

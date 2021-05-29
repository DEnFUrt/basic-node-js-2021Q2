/**
 * Module for all Board repository functions.
 * 
 * @module Board-memory-repository
 * @see {@link ./src/resources/board-model BoardModel} 
 */

const DB = require('../../common/inTempBoardDB');

/**
 * Returns an array of Board entity objects
 * 
 * @returns {Promise<BoardModel[]>} Returns an array of Board entity objects
 */
const getAll = async () => {
  const boards = await DB.getAllBoards();

  return boards;
};

/**
 * Returns an Board entity objects
 * 
 * @param {string} id - Id Board
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<BoardModel>} Returns the Board entity object with the passed id
 */
const get = async (id) => {
  const board = await DB.getBoard(id);

  if (board === null) {
    throw new Error(`The board with id: ${id} was not found`);
  };

  return board;
};

/**
 * Create a board post
 * 
 * @param {BoardModel} newBoard - New Board
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<BoardModel>} Returns the Board entity object 
 */
const create = async (newBoard) => {
  const result = DB.createBoard(newBoard);

  if (result === null) {
    throw new Error(`The board was not created`);
  };

  return result;
};

/**
 * Updating a board entry
 * 
 * @param {object} props - Updatable board record and board ID
 * @param {string} props.id - The id of the board
 * @param {BoardModel} props.newBoard - The editable post board
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<BoardModel>} Returns the Board entity object with the passed id
 */
const update = async (props) => {
  const { id } = props;
  const result = await DB.updateBoard(props);

  if (result === null) {
    throw new Error(`The board with id: ${id} was not updated`);
  };

  return result;
};

/**
 * Deleting a board entry
 * 
 * @param {string} id - Id record board for deletion
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<boolean>} Returns true on success deletions
 */
const del = async (id) => {
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
  del,
};

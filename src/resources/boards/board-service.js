/**
 * Module for all Board service functions.
 * 
 * @module Board-service
 * @see {@link ./src/resources/board-model BoardModel} 
 */

const boardsRepo = require('./board-memory-repository');
const Board = require('./board-model');
const tasksRepo = require('../tasks/task-memory-repository');

/**
 * Returns an array of Board entity objects
 * 
 * @returns {Promise<BoardModel[]>} Returns an array of Board entity objects
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns an Board entity objects
 * 
 * @param {string} id - Id Board
 * @returns {(Promise<BoardModel> | throw)} Returns the Board entity object with the passed id or return errors
 */
const get = async (id) => boardsRepo.get(id);

/**
 * Create a board post
 * 
 * @param {object} props - The title and columns of the board 
 * @param {string} props.title - The title of the board
 * @param {object[]} props.columns - The columns of the board
 * @returns {(Promise<BoardModel> | throw)} Returns the Board entity object with the passed id or return errors
 */
const create = (props) => {
  const { title, columns } = props;

  const newBoard = new Board({
    title,
    columns,
  });

  return boardsRepo.create(newBoard);
};

/**
 * Updating a board entry
 * 
 * @param {object} props - The id, title and columns of the board
 * @param {string} props.id - The id of the board 
 * @param {string} props.title - The title of the board
 * @param {object[]} props.columns - The columns of the board
 * @returns {(Promise<BoardModel> | throw)} Returns the Board entity object with the passed id or return errors
 */
const put = async (props) => {
  const { id, title, columns } = props;

  await get(id);

  const newBoard = new Board({
    id,
    title,
    columns,
  });

  return boardsRepo.update({ id, newBoard });
};

/**
 * Deleting a board entry
 * 
 * @param {string} id - Id record board for deletion
 * @returns {(Promise<boolean> | throw)} Returns true on success deletions or return errors
 */
const del = async (id) => {
  await get(id);
  await tasksRepo.delByBoradId(id);

  return boardsRepo.del(id);
};

module.exports = { getAll, get, create, put, del };

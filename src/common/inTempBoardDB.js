/**
 * Module for all Board related functions.
 *
 * @module /src/common/inTempBoardDB
 * @see /src/resources/boards/board.memory.repository
 */

const DB = [];

/**
 * Returns an array of Board entity objects
 *
 * @example
 *   getAllBoards();
 *   // -> [{ id: string, title: string, columns: [{ id: string, title: string, order: string }], {...} }]
 *
 * @returns {object[]} - Returns an array of Board entity objects
 */
const getAllBoards = () => [...DB];

/**
 * Returns the Board entity object with the passed id
 *
 * @example
 *   getBoard(id);
 *   // -> { id: string, title: string, columns: [{ id: string, title: string, order: string }] }
 *   //or;
 *   // -> null
 *
 * @param {string} id - Id Board
 * @returns {object | null} - Returns the Board entity object with the passed id or null
 */
const getBoard = (id) => {
  const board = DB.find((item) => item.id === id);

  return board || null;
};

/**
 * Create a board post
 *
 * @example
 *   createBoard(newBoard);
 *   // -> { id: string, title: string, columns: [{ id: string, title: string, order: number }] }
 *   //or;
 *   // -> null
 *
 * @param {object} newBoard - New Board
 * @param {string} newBoard.id - The id of the board
 * @param {string} newBoard.title - The title of the board
 * @param {Object[]} newBoard.columns - The columns of the board
 * @param {string} newBoard.columns.id - The id of the column
 * @param {string} newBoard.columns.title - The title of the columns
 * @param {number} newBoard.columns.order - The order of the columns
 * @returns {object | null} - Returns the created Board object, or null on error
 */
const createBoard = (newBoard) => {
  try {
    DB.push(newBoard);

    return newBoard;
  } catch {
    return null;
  }
};

/**
 * Updating a board entry
 *
 * @example
 *   updateBoard(props);
 *   // -> { id: string, title: string, columns: [{ id: string, title: string, order: number }] }
 *   //or
 *   // -> null
 *
 * @param {object} props - Updatable board record and board ID
 * @param {string} props.id - The editable post board id
 * @param {object} props.newBoard - The editable post board
 * @param {string} props.newBoard.id - The id of the board
 * @param {string} props.newBoard.title - The title of the board
 * @param {Object[]} props.newBoard.columns - The columns of the board
 * @param {string} props.newBoard.columns.id - The id of the column
 * @param {string} props.newBoard.columns.title - The title of the column
 * @param {number} props.newBoard.columns.order - The order of the column
 * @returns {object | null} - Returns the updated Board object, or null on error
 */
const updateBoard = (props) => {
  const { id, newBoard } = props;

  const searchIndexBoard = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexBoard, 1, newBoard);

    return newBoard;
  } catch {
    return null;
  }
};

/**
 * Deleting a board entry
 *
 * @example
 *   delBoard(id);
 *   // -> true
 *   or;
 *   // -> null
 *
 * @param {string} id - Id record board for deletion
 * @returns {true | null} - Returns true on success or null on error
 */
const delBoard = (id) => {
  const searchIndexBoard = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexBoard, 1);

    return true;
  } catch {
    return null;
  }
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  delBoard,
};

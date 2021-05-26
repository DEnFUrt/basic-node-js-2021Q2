const DB = [];

const getAllBoards = () => [...DB];

const getBoard = (id) => {
  const board = DB.find((item) => item.id === id);

  return board || null;
};

const createBoard = (newBoard) => {
  try {
    DB.push(newBoard);

    return newBoard;
  } catch {
    return null;
  }
};

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

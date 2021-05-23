const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = ({ title, columns }) => {
  const newBoard = new Board({
    title,
    columns
  });

  return boardsRepo.create(newBoard);
};

const put = async props => {
  const { id, title, columns } = props;
  
  await get(id);

  const newBoard = new Board({
    id,
    title,
    columns
  });

  return boardsRepo.update({ id, newBoard });
};

const del = async id => {
  await get(id);
  await tasksRepo.delByBoradId(id);
  
  return boardsRepo.del(id);
};

module.exports = { getAll, get, create, put, del };

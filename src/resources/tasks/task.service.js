const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');
const boardsRepo = require('../boards/board.memory.repository');

const getAllByBoardId = (boardId) => tasksRepo.getAllByBoardId(boardId);

const getByBoardId = (props) => tasksRepo.getByBoardId(props);

const create = async ({
  title,
  order,
  description,
  userId,
  columnId,
  boardId,
}) => {
  await boardsRepo.get(boardId);

  const newTask = new Task({
    title,
    order,
    description,
    userId,
    columnId,
    boardId,
  });

  return tasksRepo.create(newTask);
};

const put = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}) => {
  await getByBoardId({ boardId, taskId });

  const newTask = new Task({
    id: taskId,
    title,
    order,
    description,
    userId,
    columnId,
    boardId,
  });

  return tasksRepo.update({ boardId, taskId, newTask });
};

const del = async ({ boardId, taskId }) => {
  await getByBoardId({ boardId, taskId });

  return tasksRepo.del({ boardId, taskId });
};

module.exports = {
  getAllByBoardId,
  getByBoardId,
  create,
  put,
  del,
};

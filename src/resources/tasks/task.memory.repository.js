const DB = require('../../common/inTempTaskDB');

const getAllByBoardId = async boardId => {
  const tasks = await DB.getAllTasks(boardId);

  return tasks;
};

const getByBoardId = async props => {
  const { taskId } = props;

  const task = await DB.getTask(props);

  if (!task) {
    throw new Error(`The task with id: ${taskId} was not found`);
  }

  return task;
};

const create = async newTask => {
  const result = await DB.createTask(newTask);

  if (!result) {
    throw new Error(`The task was not created`);
  };

  return result;
};

const update = async props => {
  const { boardId, taskId } = props;
  const result = await DB.updateTask(props);

  if (!result) {
    throw new Error(`The task with id: ${taskId} for board with id: ${boardId} was not updated`);
  };

  return result;
};

const del = async props => {
  const { boardId, taskId } = props;
  const result = await DB.delTask(props);

  if (!result) {
    throw new Error(`The task with id: ${taskId} for board with id: ${boardId} was not deleted`);
  };

  return result;
};

const delByBoradId = async boardId => {
  const result = await DB.delTaskByBoardId(boardId);

  if (!result) {
    throw new Error(`The tasks by board with id: ${boardId} was not deleted`);
  };

  return result;
};

const resetUserId = async userId => {
  const result = await DB.resetUserIdInTasks(userId);

  if (!result) {
    throw new Error(`Tasks where User with id: ${userId} is assignee should be was not updated`);
  };

  return result;
};

module.exports = {
  getAllByBoardId,
  getByBoardId,
  create,
  update,
  del,
  delByBoradId,
  resetUserId
};

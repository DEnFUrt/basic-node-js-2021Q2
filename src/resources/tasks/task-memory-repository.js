/**
 * Module for all Tasks repository functions.
 * 
 * @module Task-memory-repository
 * @see {@link ./src/resources/task-model TaskModel} 
 */

const DB = require('../../common/inTempTaskDB');

/**
 * Returns all the Tasks entity object with the id of the Board
 * 
 * @param {string} id - Id Board
 * @returns {Promise<TaskModel[]>} Returns an array Tasks entity object with the passed id Board
 */
const getAllByBoardId = async (boardId) => {
  const tasks = await DB.getAllTasks(boardId);

  return tasks;
};

/**
 * Returns the Task entity object with the passed id and id of the Board
 * 
 * @param {object} props - Id Board and id task
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.taskId - The id of the task
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<TaskModel>} Returns the Task entity object with the passed id
 */
const getByBoardId = async (props) => {
  const { taskId } = props;

  const task = await DB.getTask(props);

  if (task === null) {
    throw new Error(`The task with id: ${taskId} was not found`);
  };

  return task;
};


/**
 * Create a task
 * 
 * @param {TaskModel} newTask - New Task
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<TaskModel>} Returns the task entity object 
 */
const create = async (newTask) => {
  const result = await DB.createTask(newTask);

  if (result === null) {
    throw new Error(`The task was not created`);
  };

  return result;
};

/**
 * Updating a task entry
 * 
 * @param {object} props - Updatable task record and board ID
 * @param {string} props.boardId - The editable task post board id
 * @param {string} props.taskId - The editable post task id
 * @param {TaskModel} props.newTask - The editable user
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<TaskModel>} Returns the User entity object with the passed id
 */
const update = async (props) => {
  const { boardId, taskId } = props;

  const searchTask = await DB.getTask({ boardId, taskId });

  if (searchTask === null) {
    throw new Error(`The task with id: ${taskId} was not found`);
  };

  const result = await DB.updateTask(props);

  if (result === null) {
    throw new Error(
      `The task with id: ${taskId} for board with id: ${boardId} was not updated`,
    );
  };

  return result;
};

/**
 * Deleting a task entry
 * 
 * @param {object} props - Updatable task record and board ID
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.taskId - The id of the task
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<boolean>} Returns true on success deletions
 */
const del = async (props) => {
  const { boardId, taskId } = props;
  const result = await DB.delTask(props);

  if (result === null) {
    throw new Error(
      `The task with id: ${taskId} for board with id: ${boardId} was not deleted`,
    );
  };

  return result;
};

/**
 * Deletes of the Board, all Tasks be deleted as well
 *
 * @param {string} boardId - The ID of the board to be removed
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<boolean>} Returns true on success deletions
 */
const delByBoradId = async (boardId) => {
  const result = await DB.delTaskByBoardId(boardId);

  if (result === null) {
    throw new Error(`The tasks by board with id: ${boardId} was not deleted`);
  };

  return result;
};

/**
 * While delete of the User, all Tasks where User is assignee updated to put userId = null
 * 
 * @param {string} userId - The ID of the user to be removed
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<boolean>} Returns true on success deletions
 */
const resetUserId = async (userId) => {
  const result = await DB.resetUserIdInTasks(userId);

  if (result === null) {
    throw new Error(
      `Tasks where User with id: ${userId} is assignee should be was not updated`,
    );
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
  resetUserId,
};

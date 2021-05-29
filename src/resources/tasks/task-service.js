/**
 * Module for all Task service functions.
 * 
 * @module Task-service
 * @see {@link ./src/resources/task-model TaskModel} 
 */

const tasksRepo = require('./task-memory-repository');
const Task = require('./task-model');
const boardsRepo = require('../boards/board-memory-repository');

/**
 * Returns all the Tasks entity object with the id of the Board
 * 
 * @param {string} id - Id Board
 * @returns {Promise<TaskModel[]>} Returns an array Tasks entity object with the passed id Board
 */
const getAllByBoardId = (boardId) => tasksRepo.getAllByBoardId(boardId);

/**
 * Returns the Task entity object with the passed id and id of the Board
 * 
 * @param {object} props - Id Board and id task
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.taskId - The id of the task
 * @returns {(Promise<TaskModel> | throw)} Returns the User entity object with the passed id
 */
const getByBoardId = (props) => tasksRepo.getByBoardId(props);

/**
 * Create a Task
 * 
 * @param {object} props - The props of the task 
   * @param {string} props.title - The title of the task
   * @param {number} props.order - The order of the task
   * @param {string} props.description - The description of the task
   * @param {string} props.userId - User id of the author of the task
   * @param {string} props.boardId - The board ID of which the task belongs
   * @param {string} props.columnId - The column ID of which the task belongs
 * @returns {(Promise<TaskModel> | throw)} Returns the Task entity object with the passed id or return errors
 */
const create = async (props) => {
  const {
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  } = props;

  await boardsRepo.get(boardId);

  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  return tasksRepo.create(newTask);
};

/**
 * Updating a task entry
 * 
 * @param {object} props - The props of the user
 * @param {string} props.taskId - The id of the task
 * @param {string} props.title - The title of the task
 * @param {number} props.order - The order of the task
 * @param {string} props.description - The description of the task
 * @param {string} props.userId - User id of the author of the task
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.columnId - The column ID of which the task belongs
 * @returns {(Promise<TaskModel> | throw)} Returns the Task entity object with the passed id or return errors
 */
const put = async (props) => {
  const {
    taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  } = props;
  
  await getByBoardId({ boardId, taskId });

  const newTask = new Task({
    id: taskId,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  return tasksRepo.update({ boardId, taskId, newTask });
};

/**
 * Deleting a task entry
 * 
 * @param {object} props - Id Board and id task
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.taskId - The id of the task
 * @returns {(Promise<boolean> | throw)} Returns true on success deletions or return errors
 */
const del = async (props) => {
  const { boardId, taskId } = props;

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

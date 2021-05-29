/**
   * @typedef {object} TaskModel
   * @property {string} id - The id of the task
   * @property {string} title - The title of the task
   * @property {number} order - The order of the task
   * @property {string} description - The description of the task
   * @property {string} userId - User id of the author of the task
   * @property {string} boardId - The board ID of which the task belongs
   * @property {string} columnId - The column ID of which the task belongs
   */

const uuid = require('uuid').v4;

/** Creates a new Task */
class Task {
  /**
   * @param {string} id - The id of the task
   * @param {string} title - The title of the task
   * @param {number} order - The order of the task
   * @param {string} description - The description of the task
   * @param {string} userId - User id of the author of the task
   * @param {string} boardId - The board ID of which the task belongs
   * @param {string} columnId - The column ID of which the task belongs
   */
  constructor({
    id = uuid(),
    title = 'Title Task',
    order = 0,
    description = 'Task description',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;

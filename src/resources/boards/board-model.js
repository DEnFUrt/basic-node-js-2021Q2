/**
   * @typedef {object} BoardModel
   * @property {string} id - The id the board
   * @property {string} title - The title of the board
   * @property {object[]} columns - The columns of the board
   * @property {string} columns.id - The id of the column
   * @property {string} columns.title - The title of the columns
   * @property {number} columns.order - The order of the columns
   */

const uuid = require('uuid').v4;

/** Creates a new Board */
class Board {
  /**
   * @param {string} id - The id the board
   * @param {string} title - The title of the board
   * @param {object[]} columns - The columns of the board
   * @param {string} columns.id - The id of the column
   * @param {string} columns.title - The title of the columns
   * @param {number} columns.order - The order of the columns
   */
  constructor({
    id = uuid(),
    title = 'Title Board',
    columns = [
      {
        id: uuid(),
        title: 'Title Column',
        order: 0,
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;

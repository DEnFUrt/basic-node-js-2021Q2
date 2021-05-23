const uuid = require('uuid').v4;

class Board {
  constructor({
    id = uuid(),
    title = 'Title Board',
    columns = [
      {
        id: uuid(),
        title: 'Title Column',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;

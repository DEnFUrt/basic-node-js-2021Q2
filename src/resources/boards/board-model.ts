import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from '../../common/interfaces';

class Board implements IBoard {
  id: string;

  title: string;
  
  columns: IColumn[];  

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
};

export default Board;

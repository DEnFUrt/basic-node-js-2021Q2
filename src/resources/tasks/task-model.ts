import { v4 as uuid } from 'uuid';
import { ITask } from '../../common/interfaces';

class Task implements ITask {
  id: string;

  title: string;
  
  order: number;
  
  description: string;
  
  userId: string | null;
  
  boardId: string;
  
  columnId: string;  
  
  constructor({
    id = uuid(),
    title = 'Title Task',
    order = 0,
    description = 'Task description',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId',
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

export default Task;

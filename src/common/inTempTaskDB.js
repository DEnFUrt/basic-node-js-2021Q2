/**
 * Module for all Board related functions.
 *
 * @module /src/common/inTempTaskdDB
 * @see /src/resources/boards/task.memory.repository
 */

let DB = [];

/**
 * Returns all the Tasks entity object with the id of the Board
 *
 * @example
 *   getAllTasks(boardId);
 *   // -> [{ id: string, title: string, order: number, description: string, userId: string }, {...}]
 *
 * @param {string} id - Id Board
 * @returns {object[]} - Returns an array Tasks entity object with the passed id Board
 */
const getAllTasks = (boardId) => {
  const tasks = DB.filter((item) => item.boardId === boardId);

  return tasks;
};

/**
 * Returns the Task entity object with the passed id and id of the Board
 *
 * @example
 *   getTask(props);
 *   // -> { id: string, title: string, order: number, description: string, userId: string }
 *   //or;
 *   // -> null
 *
 * @param {object} props - Id Board and id task
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.taskId - The id of the task
 * @returns {(object | null)} - Returns the Task entity object with the passed id and id of the Board or null
 */
const getTask = (props) => {
  const { boardId, taskId } = props;

  try {
    const task = DB.find(
      (item) => item.id === taskId && item.boardId === boardId,
    );
    return task || null;
  } catch {
    return null;
  }
};

/**
 * Create a task post
 *
 * @example
 *   createTask(newTask);
 *   // -> { id: string, title: string, order: number, description: string, userId: string, boardId: string, columnId: string }
 *   //or;
 *   // -> null
 *
 * @param {object} newTask - New Task
 * @param {string} newTask.id - The id of the task
 * @param {string} newTask.title - The title of the task
 * @param {number} newTask.order - The order of the task
 * @param {string} newTask.description - The description of the task
 * @param {string} newTask.userId - User id of the author of the task
 * @param {string} newTask.boardId - The board ID of which the task belongs
 * @param {string} newTask.columnId - The column ID of which the task belongs
 * @returns {(object | null)} - Returns the Task entity object with the passed id and id of the Board or null
 */
const createTask = (newTask) => {
  try {
    DB.push(newTask);

    return newTask;
  } catch {
    return null;
  };
};

/**
 * Updating a task entry
 *
 * @example
 *   updateTask(props);
 *   // -> { id: string, title: string, order: number, description: string, userId: string, boardId: string, columnId: string }
 *   //or;
 *   // -> null
 *
 * @param {object} props - Updatable task record and board ID
 * @param {string} props.boardId - The editable task post board id
 * @param {string} props.taskId - The editable post task id
 * @param {object} props.newTask - The editable post task
 * @param {string} props.newTask.id - The id of the task
 * @param {string} props.newTask.title - The title of the task
 * @param {number} props.newTask.order - The order of the task
 * @param {string} props.newTask.description - The description of the task
 * @param {string} props.newTask.userId - User id of the author of the task
 * @param {string} props.newTask.boardId - The board ID of which the task belongs
 * @param {string} props.newTask.columnId - The column ID of which the task belongs
 * @returns {(object | null)} - Returns the updated Task object, or null on error
 */
const updateTask = (props) => {
  const { boardId, taskId, newTask } = props;

  const searchIndexTask = DB.findIndex(
    (item) => item.id === taskId && item.boardId === boardId,
  );

  try {
    DB.splice(searchIndexTask, 1, newTask);

    return newTask;
  } catch {
    return null;
  };
};

/**
 * Deleting a task entry
 *
 * @example
 *   delTask(props);
 *   // -> true
 *   //or;
 *   // -> null
 *
 * @param {object} props - Id Board and id task
 * @param {string} props.boardId - The board ID of which the task belongs
 * @param {string} props.taskId - The id of the task
 * @returns {(true | null)} - Returns true on success or null on error
 */
const delTask = (props) => {
  const { boardId, taskId } = props;

  const searchIndexTask = DB.findIndex(
    (item) => item.id === taskId && item.boardId === boardId,
  );

  try {
    DB.splice(searchIndexTask, 1);

    return true;
  } catch {
    return null;
  };
};

/**
 * Deletes of the Board, all Tasks be deleted as well
 * 
 * @example
 *   delTaskByBoardId(boardId);
 *   // -> true
 *   //or;
 *   // -> null
 * 
 * @param {string} boardId - The ID of the board to be removed
 * @returns {(true | null)} - Returns true on success or null on error
 */
const delTaskByBoardId = (boardId) => {
  try {
    DB = DB.filter((item) => item.boardId !== boardId);

    return true;
  } catch {
    return null;
  };
};

/**
 * While delete of the User, all Tasks where User is assignee updated to put userId = null
 * 
 * @example
 *   resetUserIdInTasks(userId);
 *   // -> true
 *   //or;
 *   // -> null
 * 
 * @param {string} userId - The ID of the user to be removed
 * @returns {(true | null)} - Returns true on success or null on error
 */
const resetUserIdInTasks = (userId) => {
  try {
    DB = DB.map((item) =>
      item.userId === userId ? { ...item, userId: null } : { ...item },
    );

    return true;
  } catch {
    return null;
  };
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  delTaskByBoardId,
  delTask,
  resetUserIdInTasks,
};

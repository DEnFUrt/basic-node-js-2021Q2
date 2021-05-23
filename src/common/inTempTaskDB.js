let DB = [];

const getAllTasks = boardId => {
  const tasks = DB.filter(item => item.boardId === boardId);

  return tasks;
};

const getTask = props => {
  const { boardId, taskId } = props;

  try {
    const task = DB.find(
      item => item.id === taskId && item.boardId === boardId
    );
    return task || null;
  } catch {
    return null;
  }
};

const createTask = newTask => {
  try {
    DB.push(newTask);

    return newTask;
  } catch {
    return null;
  }
};

const updateTask = props => {
  const { boardId, taskId, newTask } = props;
  
  const searchIndexTask = DB.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );

  try {
    DB.splice(searchIndexTask, 1, newTask);

    return newTask;
  } catch {
    return null;
  }
};

const delTask = props => {
  const { boardId, taskId } = props;
  
  const searchIndexTask = DB.findIndex(
    item => item.id === taskId && item.boardId === boardId
  );

  try {
    DB.splice(searchIndexTask, 1);

    return true;
  } catch {
    return null;
  }
};

const delTaskByBoardId = boardId => {
  try {
    DB = DB.filter(item => item.boardId !== boardId);

    return true;
  } catch {
    return null;
  }
};

const resetUserIdInTasks = userId => {
  try {
    DB = DB.map(item => 
      item.userId === userId ? {...item, userId: null} : {...item}
    );

    return true;
  } catch {
    return null;
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  delTaskByBoardId,
  delTask,
  resetUserIdInTasks
};

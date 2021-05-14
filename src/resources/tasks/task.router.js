const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId }= req.params;

  try {
    const tasks = await taskService.getAllByBoardId(boardId);
    res.json(tasks);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').get(async (req, res) => {
  const { boardId }= req.params;
  const { id: taskId } = req.params;

  try {
    const task = await taskService.getByBoardId({ boardId, taskId });
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;

  const newTask = new Task({
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });

  try {
    const task = await taskService.create(newTask);

    res.status(201).json(task);    
  } catch (e) {
    res.status(400).send(`Bad request: ${e.message}`);
  }
});

router.route('/:id').put(async (req, res) => {
  const { boardId } = req.params;
  const { id: taskId } = req.params;

  const { title, order, description, userId, columnId } = req.body;
  const newTask = new Task({
    id: taskId,
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });

  try {
    const task = await taskService.put({ boardId, taskId, newTask });
    res.json(task);
  } catch (e) {
    res.status(400).send(`Bad request: ${e.message}`);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { boardId } = req.params;
  const { id: taskId } = req.params;

  try {
    const result = await taskService.del({ boardId, taskId });

    if (result) {
      res.status(200).send('The task has been deleted');
    }
  } catch (e) {
    res.status(404).send(`Task not found: ${e.message}`);
  }
});

module.exports = router;

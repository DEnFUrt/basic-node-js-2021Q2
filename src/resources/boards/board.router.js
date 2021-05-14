const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const borads = await boardService.getAll();

  res.json(borads);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const borad = await boardService.get(id);

    res.json(borad);
  } catch (e) {
    res.status(404).send(`Board not found: ${e.message}`);
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const newBoard = new Board({
    title,
    columns
  });

  try {
    const board = await boardService.create(newBoard);

    res.status(201).json(board);
  } catch (e) {
    res.status(400).send(`Bad request: ${e.message}`);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id }= req.params;
  const { title, columns } = req.body;
  const newBoard = new Board({
    id,
    title,
    columns
  });

  try {
    const board = await boardService.put({ id, newBoard });
    
    res.json(board);
  } catch (e) {
    res.status(400).send(`Bad request: ${e.message}`);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id }= req.params;
  
  try {
    const result = await boardService.del(id);

    if (result) {
      res.status(204).send('The board has been deleted');
    }
  } catch (e) {
    res.status(404).send(`Board not found: ${e.message}`);
  }
});

module.exports = router;

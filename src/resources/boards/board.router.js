const router = require('express').Router();
const StatusCodes = require('http-status-codes');
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
    res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: `Board not found: ${e.message}` });
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;

  try {
    const board = await boardService.create({ title, columns });

    res.status(StatusCodes.CREATED).json(board);
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: `Bad request: ${e.message}` });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { title, columns } = req.body;

  try {
    const board = await boardService.put({ id, title, columns });

    res.json(board);
  } catch (e) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: `Bad request: ${e.message}` });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await boardService.del(id);

    if (result) {
      res
        .status(StatusCodes.NO_CONTENT)
        .send({ message: 'The board has been deleted' });
    }
  } catch (e) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: `Board not found: ${e.message}` });
  }
});

module.exports = router;

const router = require('express').Router();
const StatusCodes = require('http-status-codes');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.get(id);

    res.json(user);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send({ message: `User not found: ${e.message}` });
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  
  try {
    const user = await usersService.create({ name, login, password });

    res.status(StatusCodes.CREATED).json(user);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: `Bad request: ${e.message}` });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  
  try {
    const user = await usersService.put({ id, name, login, password });

    res.json(user);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: `Bad request: ${e.message}` });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await usersService.del(id);

    if (result) {
      res.status(StatusCodes.NO_CONTENT).send({ message: 'The user has been deleted' });
    }
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send({ message: `User not found: ${e.message}` });
  }
});

module.exports = router;

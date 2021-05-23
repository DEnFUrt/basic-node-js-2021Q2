const router = require('express').Router();
const StatusCodes = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.get(id);

    res.json(User.toResponse(user));
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send(`User not found: ${e.message}`);
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const newUser = new User({
    name,
    login,
    password
  });

  try {
    const user = await usersService.create(newUser);

    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(`Bad request: ${e.message}`);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const newUser = new User({
    id,
    name,
    login,
    password
  });

  try {
    const user = await usersService.put({ id, newUser });

    res.json(User.toResponse(user));
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(`Bad request: ${e.message}`);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await usersService.del(id);

    if (result) {
      res.status(StatusCodes.NO_CONTENT).send('The user has been deleted');
    }
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send(`User not found: ${e.message}`);
  }
});

module.exports = router;

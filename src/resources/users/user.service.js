const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();

  return users.map(User.toResponse);
};

const get = async id => {
  const user = await usersRepo.get(id);

  return User.toResponse(user);
};

const create = async ({ name, login, password }) => {
  const newUser = new User({
    name,
    login,
    password
  });

  const user = await usersRepo.create(newUser);

  return User.toResponse(user);
};

const put = async ({ id, name, login, password }) => {
  await get(id);

  const newUser = new User({
    id,
    name,
    login,
    password
  });

  const user = await usersRepo.update({id, newUser});

  return User.toResponse(user);
};

const del = async id => {
  await get(id);
  await tasksRepo.resetUserId(id);
  
  return usersRepo.del(id);
};

module.exports = { getAll, get, create, put, del };
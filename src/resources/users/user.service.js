const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = newUser => usersRepo.create(newUser);

const put = props => usersRepo.update(props);

const del = async id => {
  await tasksRepo.resetUserId(id);
  return usersRepo.del(id);
};

module.exports = { getAll, get, create, put, del };
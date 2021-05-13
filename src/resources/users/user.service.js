const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const get = async id => usersRepo.get(id);

const create = async newUser => usersRepo.create(newUser);

const put = async props => usersRepo.update(props);

const del = async id => usersRepo.del(id);

module.exports = { getAll, get, create, put, del };
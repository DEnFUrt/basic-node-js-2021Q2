const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = newBoard => boardsRepo.create(newBoard);

const put = props => boardsRepo.update(props);

const del = id => boardsRepo.del(id);

module.exports = { getAll, get, create, put, del };

const DB = require('../../common/inTempUserDB');

const getAll = async () => {
  const users = await DB.getAllUsers()

  return users;
};

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return user;
};

const create = async newUser => {
  const result = await DB.createUser(newUser);

  if (!result) {
    throw new Error(`The user was not created`);
  };

  return result;
};

const update = async props => {
  const { id } = props;
  const result = await DB.updateUser(props);

  if (!result) {
    throw new Error(`The user with id: ${id} was not updated`);
  };

  return result;
};

const del = async id => {
  const result = await DB.delUser(id);

  if (!result) {
    throw new Error(`The user with id: ${id} was not deleted`);
  };

  return result;
};

module.exports = { getAll, get, create, update, del };

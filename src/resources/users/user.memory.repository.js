const DB = require('../../common/inTempUserDB');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = DB.getUser(id);

  if (!user) {
    throw new Error(`The user with id: ${id} was not found`);
  }

  return user;
};

const create = async newUser => {
  const result = DB.createUser(newUser);

  if (!result) {
    throw new Error(`The user was not created`);
  };

  return result;
};

const update = async props => {
  const { id } = props;
  const result = DB.updateUser(props);

  if (!result) {
    throw new Error(`The user with id: ${id} was not updated`);
  };

  return result;
};

const del = async id => {
  const result = DB.delUser(id);

  if (!result) {
    throw new Error(`The user with id: ${id} was not deleted`);
  };

  return result;
};

module.exports = { getAll, get, create, update, del };

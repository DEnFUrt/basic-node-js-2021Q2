const DB = [];

const getAllUsers = () => [...DB];

const getUser = id => {
  const user = DB.find(item => item.id === id);

  return user || null;
};

const createUser = newUser => {
  try {
    DB.push(newUser);

    return newUser;
  } catch {
    return null;
  }
};

const updateUser = props => {
  const { id, newUser } = props;

  const searchIndexUser = DB.findIndex(item => item.id === id);

  try {
    DB.splice(searchIndexUser, 1, newUser);

    return newUser;
  } catch {
    return null;
  }
};

const delUser = id => {
  const searchIndexUser = DB.findIndex(item => item.id === id);

  try {
    DB.splice(searchIndexUser, 1);

    return true;
  } catch {
    return null;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  delUser
};

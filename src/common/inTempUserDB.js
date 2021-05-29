/**
 * Module for all Users related functions.
 *
 * @module UserDb
 * @see {@link ./src/resources/user-model UserModel}
 */

const DB = [];

/**
 * Returns an array of User entity objects
 *
 * @example
 *   getAllUsers();
 *   // -> [{ id: string, name: string, login: string, {...} }]
 *
 * @returns {UserModel[]} Returns an array of User entity objects
 */
const getAllUsers = () => [...DB];

/**
 * Returns the User entity object with the passed id
 *
 * @example
 *   getUser(id);
 *   // -> { id: string, name: string, login: string }
 *   //or;
 *   // -> null
 *
 * @param {string} id - Id User
 * @returns {(UserModel | null)} - Returns the User entity object with the passed id or null
 */
const getUser = (id) => {
  const user = DB.find((item) => item.id === id);

  return user || null;
};

/**
 * Create a user
 *
 * @example
 *   createUser(newUser);
 *   // -> { id: string, name: string, login: string }
 *   //or;
 *   // -> null
 *
 * @param {object} newUser - New User
 * @param {string} newUser.id - The id of the user
 * @param {string} newUser.name - The name of the user
 * @param {string} newUser.login - The login of the user
 * @param {string} newUser.password - The password of the userw User
 * @returns {(UserModel | null)} - Returns the created Board object, or null on error
 */
const createUser = (newUser) => {
  try {
    DB.push(newUser);

    return newUser;
  } catch {
    return null;
  };
};

/**
 * Updating a user entry
 *
 * @example
 *   updateUser(props);
 *   // -> { id: string, name: string, login: string }
 *   //or;
 *   // -> null
 *
 * @param {object} props - Updatable user record and user ID
 * @param {string} props.id - The editable user id
 * @param {object} props.newUser - New User
 * @param {string} props.newUser.id - The id of the user
 * @param {string} props.newUser.name - The name of the user
 * @param {string} props.newUser.login - The login of the user
 * @param {string} props.newUser.password - The password of the userw User
 * @returns {(UserModel | null)} - Returns the created Board object, or null on error
 */
const updateUser = (props) => {
  const { id, newUser } = props;

  const searchIndexUser = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexUser, 1, newUser);

    return newUser;
  } catch {
    return null;
  };
};

/**
 * Deleting a user entry
 *
 * @example
 *   delUser(id);
 *   // -> true
 *   //or;
 *   // -> null
 *
 * @param {string} id - Id record user for deletion
 * @returns {(true | null)} - Returns true on success or null on error
 */
const delUser = (id) => {
  const searchIndexUser = DB.findIndex((item) => item.id === id);

  try {
    DB.splice(searchIndexUser, 1);

    return true;
  } catch {
    return null;
  };
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  delUser,
};

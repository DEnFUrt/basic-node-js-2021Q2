/**
 * Module for all Users repository functions.
 * 
 * @module User-memory-repository
 * @see {@link ./src/resources/user-model UserModel} 
 */

const DB = require('../../common/inTempUserDB');

/**
 * Returns an array of Users entity objects
 * 
 * @returns {Promise<UserModel[]>} Returns an array of Users entity objects
 */
const getAll = async () => {
  const users = await DB.getAllUsers();

  return users;
};

/**
 * Returns an User entity objects
 * 
 * @param {string} id - Id User
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<UserModel>} Returns the User entity object with the passed id
 */
const get = async (id) => {
  const user = await DB.getUser(id);

  if (user === null) {
    throw new Error(`The user with id: ${id} was not found`);
  };

  return user;
};

/**
 * Create a user
 * 
 * @param {UserModel} newUser - New User
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<UserModel>} Returns the user entity object 
 */
const create = async (newUser) => {
  const result = await DB.createUser(newUser);

  if (result === null) {
    throw new Error(`The user was not created`);
  };

  return result;
};

/**
 * Updating a user entry
 * 
 * @param {object} props - Updatable user record and user ID
 * @param {string} props.id - The id of the user
 * @param {UserModel} props.newUser - The editable user
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<UserModel>} Returns the User entity object with the passed id
 */
const update = async (props) => {
  const { id } = props;
  const result = await DB.updateUser(props);

  if (result === null) {
    throw new Error(`The user with id: ${id} was not updated`);
  };

  return result;
};

/**
 * Deleting a user entry
 * 
 * @param {string} id - Id user for deletion
 * @throws {Error} Will throw an error if result is null  
 * @returns {Promise<boolean>} Returns true on success deletions
 */
const del = async (id) => {
  const result = await DB.delUser(id);

  if (result === null) {
    throw new Error(`The user with id: ${id} was not deleted`);
  };

  return result;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  del
};

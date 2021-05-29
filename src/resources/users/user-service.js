/**
 * Module for all User service functions.
 * 
 * @module User-service
 * @see {@link ./src/resources/user-model UserModel} 
 */

const usersRepo = require('./user-memory-repository');
const User = require('./user-model');
const tasksRepo = require('../tasks/task-memory-repository');

/**
 * Returns an array of User entity objects
 * 
 * @returns {Promise<UserModel[]>} Returns an array of User entity objects
 */
const getAll = async () => {
  const users = await usersRepo.getAll();

  return users.map(User.toResponse);
};

/**
 * Returns an User entity objects
 * 
 * @param {string} id - Id User
 * @returns {(Promise<UserModel> | throw)} Returns the User entity object with the passed id or return errors
 */
const get = async (id) => {
  const user = await usersRepo.get(id);

  return User.toResponse(user);
};

/**
 * Create a User
 * 
 * @param {object} props - The props of the user 
 * @param {string} props.name - The name of the user
 * @param {string} props.login - The login of the user
 * @param {string} props.password - The password of the userw User
 * @returns {(Promise<UserModel> | throw)} Returns the User entity object with the passed id or return errors
 */
const create = async (props) => {
  const { name, login, password } = props;

  const newUser = new User({
    name,
    login,
    password,
  });

  const user = await usersRepo.create(newUser);

  return User.toResponse(user);
};

/**
 * Updating a user entry
 * 
 * @param {object} props - The props of the user
 * @param {string} props.id - The id of the user 
 * @param {string} props.name - The name of the user
 * @param {string} props.login - The login of the user
 * @param {string} props.password - The password of the userw User
 * @returns {(Promise<UserModel> | throw)} Returns the User entity object with the passed id or return errors
 */
const put = async (props) => {
  const { id, name, login, password } = props;

  await get(id);

  const newUser = new User({
    id,
    name,
    login,
    password,
  });

  const user = await usersRepo.update({ id, newUser });

  return User.toResponse(user);
};

/**
 * Deleting a user entry
 * 
 * @param {string} id - Id user for deletion
 * @returns {(Promise<boolean> | throw)} Returns true on success deletions or return errors
 */
const del = async (id) => {
  await get(id);
  await tasksRepo.resetUserId(id);

  return usersRepo.del(id);
};

module.exports = { getAll, get, create, put, del };

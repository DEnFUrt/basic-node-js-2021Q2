/**
   * @typedef {object} UserModel
   * @property {string} id - The id of the user
   * @property {string} name - The name of the user
   * @property {string} login - The login of the user
   * @property {string} password - The password of the user
   */

const uuid = require('uuid').v4;

/** Creates a new User */
class User {
  /**
   * @param {string} id - The id of the user
   * @param {string} name - The name of the user
   * @param {string} login - The login of the user
   * @param {string} password - The password of the user
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Convert an object containing user properties returns all properties except
   * for the password property.
   *
   * @param {object} user
   * @param {string} user.id - The id of the user
   * @param {string} user.name - The name of the user
   * @param {string} user.login - The login of the user
   * @param {string} user.password - The password of the user
   * @returns {{ id: string, name: string, login: string }} A User object except for the password property.
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;

/*eslint-disable*/
const UserRouter = require('./SignUp');
const booksRouter = require('./Books');
const AuthRouter = require('./Authenticated');

module.exports = {
  UserRouter,
  booksRouter,
  AuthRouter
};
/*eslint-disable*/
const express = require("express");
const UserRouter = express.Router();

const userCtrl = require("../controllers/User.ctrl");
/*
async function signUp(req, res) {
  return await userCtrl.signUp(req, res);
}
async function signIn(req, res) {
  return await userCtrl.signIn(req, res);
}
*/

UserRouter.post('/signup', userCtrl.signUp);
UserRouter.post('/login', userCtrl.login);


module.exports = UserRouter;

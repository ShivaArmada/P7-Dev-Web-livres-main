/*eslint-disable*/
const express = require("express");
const UserRouter = express.Router();

const userCtrl = require("../controllers/User.ctrl");

//Une nationale pour se connecter ou s'inscrire
UserRouter.post('/signup', userCtrl.signUp);
UserRouter.post('/login', userCtrl.login);


module.exports = UserRouter;

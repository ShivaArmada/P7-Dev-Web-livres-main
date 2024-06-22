/*eslint-disable*/
const express = require('express');
const UserRouter = express.Router();
const API_ROUTES = require('../../src/utils/constants'); // Assurez-vous que le chemin vers apiRoutes.js est correct

const userCtrl = require('../controllers/User');


async function signUp(req, res) {
    return await userCtrl.signUp(req, res);
}
async function signIn(req, res) {
    return await userCtrl.signIn(req, res);
}

/*
UserRouter.post('/signup', userCtrl.signUp);
UserRouter.post('/signin', userCtrl.signIn);
*/


module.exports = {signUp, signIn};
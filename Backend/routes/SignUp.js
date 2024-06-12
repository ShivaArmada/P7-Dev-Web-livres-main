/*eslint-disable*/
const express = require('express');
const Userrouter = express.Router();
const API_ROUTES = require('../../src/utils/constants'); // Assurez-vous que le chemin vers apiRoutes.js est correct

const userCtrl = require('../controllers/User');

router.post(API_ROUTES.SIGN_UP, userCtrl.signUp);
router.post(API_ROUTES.SIGN_IN, userCtrl.signIn);


module.exports = UserRouter;
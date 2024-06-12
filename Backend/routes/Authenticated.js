/*eslint-disable*/

const API_ROUTES = require('../../src/utils/constants');
const express = require ('express');
const Authrouter = express.Router();
const authenticateToken = require ('../Middleware/authenticate');
const AuthenticatedController = require('../controllers/AuthenticatedController');

router.get(API_ROUTES.AUTHENTICATED_USER, authenticateToken, AuthenticatedController.getAuthenticatedUser);

module.exports = AuthRouter;
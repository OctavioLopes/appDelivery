const express = require('express');
const { createAdmController, deleteAdmController } = require('../controller/admController');
const authenticate = require('../middleware/auth');

const admRouter = express.Router();

admRouter.post('/adm', authenticate, createAdmController);
admRouter.delete('/adm/:email', authenticate, deleteAdmController);

module.exports = admRouter;
const express = require('express');
const { createRegisterController } = require('../controller/registerController');
const registerValidation = require('../middleware/registerValidation');

const registerRouter = express.Router();

registerRouter.post('/register', registerValidation, createRegisterController);

module.exports = registerRouter;
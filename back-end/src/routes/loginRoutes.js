const express = require('express');
const { createLoginController, getAllLoginController } = require('../controller/loginController');
const loginValidation = require('../middleware/loginValidation');
const { verifyToken } = require('../controller/verifyTokenController');

const loginRouter = express.Router();

loginRouter.post('/login', loginValidation, createLoginController);
loginRouter.get('/login', getAllLoginController);
loginRouter.get('/verify/:token', verifyToken);

module.exports = loginRouter;

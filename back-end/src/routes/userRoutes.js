const { Router } = require('express');
const { getUserByEmailController, getUserByIdController,
  getUsersByRoleController } = require('../controller/userController');

const userRouter = Router();

userRouter.get('/users/:role', getUsersByRoleController);
userRouter.get('/user/:email', getUserByEmailController);
userRouter.get('/user/:id', getUserByIdController);

module.exports = userRouter;

const express = require('express');
const sellerRouter = require('./sellerRoutes');
const loginRouter = require('./loginRoutes');
const registerRouter = require('./registerRoutes');
const customerRouter = require('./customerRouter');
const userRouter = require('./userRoutes');
const admRouter = require('./admRoutes');
const imagesRouter = require('./imagesRoutes');

const routes = express();

// Rotas da Api

routes.use(sellerRouter);
routes.use(loginRouter);
routes.use(registerRouter);
routes.use(customerRouter);
routes.use(userRouter);
routes.use(admRouter);
routes.use(imagesRouter);
 
module.exports = routes;

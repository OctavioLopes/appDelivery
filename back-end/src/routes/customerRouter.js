const express = require('express');
const customerController = require('../controller/customerController');
const authorization = require('../middleware/auth');

const customerRouter = express.Router();

customerRouter
  .get('/customer/products', authorization, customerController.getAllProductsController);
customerRouter
  .post('/customer/checkout', authorization, customerController.postCheckoutController);
customerRouter
  .get('/customer/orders/:id', authorization, customerController.getOrderIdController);
customerRouter
  .patch('/customer/orders/:id', authorization, customerController.updateStatusController);
customerRouter
  .get('/customer/orders/user/:id', authorization, customerController.getAllOrdersController);
  
module.exports = customerRouter;
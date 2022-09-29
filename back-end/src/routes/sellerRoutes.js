const { Router } = require('express');
const { 
  getAllSaleBySellerIdController,
  updateSaleStatus,
} = require('../controller/sellerController');

const sellerRouter = Router();

sellerRouter.get('/sale/:id', getAllSaleBySellerIdController);
sellerRouter.patch('/sale/:id', updateSaleStatus);

module.exports = sellerRouter;
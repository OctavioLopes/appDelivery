const productsService = require('../service/customerService');

const getAllProductsController = async (req, res) => {
  const getAllRegister = await productsService.getAllProductsService();
  return res.status(201).json(getAllRegister);
};

const postCheckoutController = async (req, res) => {
  const getId = await productsService.checkoutService(req.body);
  console.log(getId.dataValues.id);
  return res.status(201).json(getId.dataValues.id);
};

const getOrderIdController = async (req, res) => {
  const order = await productsService.getOrderIdService(req.params.id);
  return res.status(200).json(order);
};

const getAllOrdersController = async (req, res) => {
  const getAllOrders = await productsService.getAllUserService(req.params.id);
  return res.status(201).json(getAllOrders);
};

const updateStatusController = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await productsService.updateStatusService(id, status);
  return res.status(200).json({ message: 'status alterado com sucesso' });
};

module.exports = { 
  getAllProductsController,
  postCheckoutController,
  getOrderIdController,
  getAllOrdersController,
  updateStatusController };
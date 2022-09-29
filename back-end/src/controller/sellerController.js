const salesService = require('../service/sellerService');

const getAllSaleBySellerIdController = async (req, res) => {
  const sale = await salesService.getAllSaleBySellerIdService(req.params.id);
  return res.status(200).json(sale);
};

const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const response = await salesService.updateSaleStatus(id, status);
  if (response) { 
    return res.status(200)
    .json({ message: `status do pedido com id ${id} alterado com sucesso` });
  }
  res.status(404).json({ message: `status do pedido com id ${id} não alterado` });
};

module.exports = { getAllSaleBySellerIdController, updateSaleStatus };
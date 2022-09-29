const { Sale } = require('../database/models');

const getAllSaleBySellerIdService = async (id) => {
  const sale = Sale.findAll({
    where: { sellerId: id },
  });

  return sale;
};

const updateSaleStatus = async (id, status) => {
  const [qtdUpdated] = await Sale.update({ 
    status, 
  },
  {
    where: { sellerId: id },
  });
  return qtdUpdated > 0;
};

module.exports = { getAllSaleBySellerIdService, updateSaleStatus };
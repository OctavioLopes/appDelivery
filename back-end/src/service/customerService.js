const { Product } = require('../database/models');
const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');
const AppError = require('../middleware/AppError');

const getAllProductsService = async () => {
  const getAll = await Product.findAll();
  if (!getAll) {
    throw new AppError('Não encontrado', 400);
  }
  return getAll;
};

const checkoutService = async (body) => {
  console.log(body);
  const { userId,
    sellerId, totalPrice, deliveryAddress, deliveryNumber, status } = body;
  const sales = {
userId,
sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: new Date(),
    status,
  };
  const createSales = await Sale.create(sales);
  if (!createSales) { throw new AppError('Venda não autorizada', 400); }
  const { id } = createSales.dataValues;
  await SalesProduct.bulkCreate(body.products
    .map((item) => ({ saleId: id, productId: item.id, quantity: item.quantity })));
  return createSales;
};

// const checkoutProducts = async (products) => {
//   const createSales = await Sale.create(checkoutService(products));
//   if (!createSales) {
//     throw new AppError('Venda não autorizada', 400);
//   }
//   const { id } = createSales.dataValues;
//   await SalesProduct.bulkCreate(products.produtos
//     .map(({ productId, quantity }) => ({ saleId: id, productId, quantity })));
//   return createSales;
// }

const getAllUserService = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });
  if (!sales) {
    throw new AppError('Venda não encontrada', 400);
  }
  return sales;
};

const getOrderIdService = async (id) => {
  const getSale = await Sale.findOne({
    where: { id },
  });
  const { userId, sellerId, totalPrice, saleDate, status } = getSale;
  const getProducts = await SalesProduct.findAll({
    where: { saleId: id },
    attributes: ['saleId', 'productId', 'quantity'],
  });
  const sale = {
    userId,
    sellerId,
    totalPrice,
    saleDate,
    status,
    products: getProducts,
  };
  return sale;
};

const updateStatusService = async (id, status) => {
  const update = await Sale.update({
    status,
  },
    {
      where: { id },
    });
  if (!update) {
    throw new AppError('Atualização não efetuada', 400);
  }
  return update;
};

module.exports = {
  getAllProductsService,
  checkoutService,
  getAllUserService,
  getOrderIdService,
  updateStatusService,
};

/* {
  "userId":"1",
  "sellerId":1,
  "totalPrice":"25.00",
  "deliveryAdress":"huhugugu",
  "deliveryNumber":"20",
  "produtos":[{
    "productId":"1",
    "quantity":"4"
  }, {
    "productId":"2",
    "quantity":"4"
  }],
  "status":"pendente"
  
} */

let orderCart = [];

const orderCartReducer = (state, action) => {
  switch (action.type) {
  case 'add_orderCart':
    orderCart = action.payload;
    return orderCart;
  default:
    return orderCart;
  }
};

export default orderCartReducer;

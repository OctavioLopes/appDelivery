let totalPrice = 0;

const totalPriceReducer = (state, action) => {
  switch (action.type) {
  case 'add_totalPrice':
    totalPrice = action.payload;
    return totalPrice;
  default:
    return totalPrice;
  }
};

export default totalPriceReducer;

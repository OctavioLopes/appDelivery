let saleInfo = {};

const saleInfoReducer = (state, action) => {
  switch (action.type) {
  case 'add_saleInfo':
    saleInfo = action.payload;
    return saleInfo;
  default:
    return saleInfo;
  }
};

export default saleInfoReducer;

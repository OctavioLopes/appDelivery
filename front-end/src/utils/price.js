const changeString = (arg) => {
  const aux = arg.substring(0, arg.indexOf('.'));
  const newPrice = `${aux},${arg.substring(arg.indexOf('.') + 1)}`;
  return newPrice;
};

export default changeString;

const md5 = require('md5');
const { User } = require('../database/models');
const AppError = require('../middleware/AppError');
const { generateJWTToken } = require('../utils/jwt');

const authentication = async (email, password) => {
  const hashPassword = md5(password);
  
  const verifyUser = await User.findOne({
    where: { email, password: hashPassword },
  });

  console.log(verifyUser);

  if (!verifyUser) {   
    throw new AppError('Usuário inexistente', 404);
  }  

  const tokenUser = generateJWTToken(
    { email, password },
    );
  
  return { id: verifyUser.id, token: tokenUser };
};

const getAllService = async () => {
    const getAll = await User.findAll();
    return getAll;
};

module.exports = { authentication, getAllService };

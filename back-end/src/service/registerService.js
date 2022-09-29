const crypto = require('crypto');
const { User } = require('../database/models');
const AppError = require('../middleware/AppError');
const { generateJWTToken } = require('../utils/jwt');

const createRegisterService = async ({ name, email, password }) => {
  const userRegistered = await User.findOne({ where: { email } });

  if (userRegistered) {
    throw new AppError('Usuário já existente', 409);
  }
  
  const passwordHash = crypto.createHash('md5').update(password).digest('hex');

  // ver como vai ser feito o role
  
  const user = await User.create({ name, email, password: passwordHash, role: 'customer' });

  const tokenUser = generateJWTToken({ name, email, password });

  return { id: user.id, token: tokenUser };
};

module.exports = createRegisterService;

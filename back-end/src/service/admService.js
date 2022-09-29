const crypto = require('crypto');
const { User } = require('../database/models');
const AppError = require('../middleware/AppError');

const createAdmService = async ({ name, role, email, password }) => {
  const userRegistered = await User.findOne({ where: { email } });

  if (userRegistered) {
    throw new AppError('Usuário já existente', 409);
  }
  
  const passwordHash = crypto.createHash('md5').update(password).digest('hex');
  
  await User.create({ name, role, email, password: passwordHash });

  return true;
};

const deleteAdmService = async ({ email }) => {
  const userRegistered = await User.findOne({ where: { email } });

  if (!userRegistered) {
    throw new AppError('Usuário não existente', 400);
  }

  await User.destroy({ where: { email } });

  return true;
};

module.exports = { createAdmService, deleteAdmService };

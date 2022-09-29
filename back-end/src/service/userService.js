const AppError = require('../middleware/AppError');
const { User } = require('../database/models');

const userNotFound = 'usuário não encontrado';

const getUserByEmailService = async (email) => {
  const user = await User.findOne({
    where: { email } });
    
  if (!user) {
    throw new AppError(userNotFound, 400);
  }

  return user;
};

const getUserByIdService = async (id) => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    throw new AppError(userNotFound, 400);
  }

  return user;
};

const getUsersByRoleService = async (role) => {
  const [users] = await User.findAll({
    where: { role } });

    console.log(users.dataValues);

  if (!users) {
    throw new AppError('usuário não encontrado', 400);
  }

  return users.dataValues;
};
module.exports = { getUserByEmailService, getUsersByRoleService, getUserByIdService };

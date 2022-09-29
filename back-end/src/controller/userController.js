const { getUserByEmailService, getUsersByRoleService,
  getUserByIdService } = require('../service/userService');
  
  const getUserByEmailController = async (req, res) => {
    const { email } = req.params;
    const user = await getUserByEmailService(email);
    return res.status(200).json(user);
  };
  
  const getUserByIdController = async (req, res) => {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res.status(200).json(user);
  };
  
  const getUsersByRoleController = async (req, res) => {
    const { role } = req.params;
    const users = await getUsersByRoleService(role);
    return res.status(200).json([users]);
  };
  
module.exports = { getUserByEmailController, getUsersByRoleController, getUserByIdController };
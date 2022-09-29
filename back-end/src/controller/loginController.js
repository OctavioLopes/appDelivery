const loginService = require('../service/loginService');

const createLoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
   const { id, token } = await loginService.authentication(email, password);
  return res.status(200).json({ id, token });
};

const getAllLoginController = async (req, res) => {
  const getAllRegister = await loginService.getAllService();
  return res.status(200).json(getAllRegister);
};
module.exports = { createLoginController, getAllLoginController };

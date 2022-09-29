const { createAdmService, deleteAdmService } = require('../service/admService');

const createAdmController = async (req, res) => {
  await createAdmService(req.body);
  res.status(201).json({ message: 'Usuário criado com sucesso!' });
};

const deleteAdmController = async (req, res) => {
  await deleteAdmService(req.params);
  res.status(201).json({ message: `usuário com email
   ${req.params.email} deletado com Sucesso!` });  
};

module.exports = { createAdmController, deleteAdmController };

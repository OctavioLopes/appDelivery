const { authenticateToken } = require('../utils/jwt');

const verifyToken = async (req, res) => {
  const { token } = req.params;
  const result = authenticateToken(token);

  if (result) res.status(200).json('token valido');
};

module.exports = { 
  verifyToken,
};

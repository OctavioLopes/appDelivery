const createRegisterService = require('../service/registerService');

const createRegisterController = async (req, res) => {
    const { id, token } = await createRegisterService(req.body);
    res.status(201).json({ id, token });
};

module.exports = { createRegisterController };
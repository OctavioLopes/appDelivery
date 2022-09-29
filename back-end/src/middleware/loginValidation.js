const Joi = require('joi');

const validation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidation = (request, response, next) => {
  const { error } = validation.validate(request.body);
  if (error) {
    return response.status(400).json({ message: 'Alguns campos obrigatórios estão faltando' });
  } 
  next();
};
 module.exports = loginValidation;

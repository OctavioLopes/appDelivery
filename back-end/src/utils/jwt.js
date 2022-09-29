require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtKey = require('fs').readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
const AppError = require('../middleware/AppError');
// const JWT_KEY = require('')

const TOKEN_SECRET = jwtKey;
// Saber importar jwt.evaluation.key
const jwtConfig = {
    expiresIn: '240h',
    algorithm: 'HS256',
};

const generateJWTToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token) => {
    if (!token) {
        throw new AppError('Token não encontrado', 401);        
    }

    try {
        const validate = jwt.verify(token, TOKEN_SECRET);
        return validate;
    } catch (error) {
        console.log(error);
        throw new AppError('Token inválido ou expirado', 401);
    }
};

module.exports = {
    generateJWTToken,
    authenticateToken,
}; 

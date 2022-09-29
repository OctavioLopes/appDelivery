const { authenticateToken } = require('../utils/jwt');
const AppError = require('./AppError');

const authenticate = async (request, response, next) => {
    const token = request.headers.authorization;
    const user = await authenticateToken(token);
    if (!user) {
        throw new AppError('Token not found', 401);     
    }
    response.locals.user = user;
    next();
};
module.exports = authenticate; 
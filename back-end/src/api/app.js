require('express-async-errors');
const express = require('express');
const cors = require('cors');
const routes = require('../routes/index');

const AppError = require('../middleware/AppError');

// configuração do app

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use((err, _request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  if (!err.statusCode) {
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
  return next();
});

module.exports = app;

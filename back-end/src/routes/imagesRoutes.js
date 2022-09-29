const express = require('express');
const imagesController = require('../controller/imagesController');

const imagesRouter = express.Router();
imagesRouter.get('/images/:name', imagesController);

module.exports = imagesRouter;
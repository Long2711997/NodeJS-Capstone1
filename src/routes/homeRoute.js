const express = require('express');
const homeRouter = express.Router();
const {getAllImages, findImagesByName} = require('../controllers/homeController')

homeRouter.get('/', getAllImages);

homeRouter.get('/search', findImagesByName)

module.exports = homeRouter;
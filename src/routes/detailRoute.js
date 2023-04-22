const express = require('express');
const detailRouter = express.Router();
const { getImageDetail, getImageComment, getSaveInfo } = require('../controllers/detailController');

detailRouter.get('/image/:hinh_id', getImageDetail);

detailRouter.get('/image/comment/:hinh_id', getImageComment);

detailRouter.get('/image/save-info/:hinh_id', getSaveInfo);

module.exports = detailRouter;
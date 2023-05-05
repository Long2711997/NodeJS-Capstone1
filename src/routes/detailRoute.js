const express = require('express');
const detailRouter = express.Router();
const { getImageDetail, getImageComment, getSaveInfo, comment } = require('../controllers/detailController');

detailRouter.get('/image/:hinh_id', getImageDetail);

detailRouter.get('/image/comment/:hinh_id', getImageComment);

detailRouter.get('/image/save-info/:hinh_id', getSaveInfo);

detailRouter.post('/image/comment/:hinh_id', comment)

module.exports = detailRouter;
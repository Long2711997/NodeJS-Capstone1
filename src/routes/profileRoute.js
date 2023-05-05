const express = require('express');
const { getUser, getSavedImageByUserId, getImageByUserId, deleteImageById, uploadNewImage, updateProfile } = require('../controllers/profileController');
const profileRouter = express.Router();

profileRouter.get('/', getUser)

profileRouter.get('/get-save-image', getSavedImageByUserId)

profileRouter.get('/get-image', getImageByUserId)

profileRouter.put('/delete', deleteImageById)

profileRouter.post('/upload', uploadNewImage)

profileRouter.put('/update/:nguoi_dung_id', updateProfile)

module.exports = profileRouter;
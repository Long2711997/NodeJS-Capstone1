const express = require('express');
const userRouter = express.Router();
const { userSignUp, userLogin } = require('../controllers/userController')


userRouter.post('/sign-up', userSignUp);

userRouter.post('/log-in', userLogin);

module.exports = userRouter;
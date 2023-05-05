const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./userRoute');
const homeRouter = require('./homeRoute');
const detailRouter = require('./detailRoute');
const profileRouter = require('./profileRoute');

rootRouter.use('/user', userRouter);

rootRouter.use('/home', homeRouter);

rootRouter.use('/detail', detailRouter);

rootRouter.use('/profile', profileRouter);

module.exports = rootRouter;
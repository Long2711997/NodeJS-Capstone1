const express = require('express');
const rootRouter = express.Router();

const userRouter = require('./userRoute');
const homeRouter = require('./homeRoute');
const detailRouter = require('./detailRoute');

rootRouter.use('/user', userRouter);

rootRouter.use('/home', homeRouter);

rootRouter.use('/detail', detailRouter);

module.exports = rootRouter;
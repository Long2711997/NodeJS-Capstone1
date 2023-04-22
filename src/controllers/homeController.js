const { Op } = require('sequelize');
const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);

const getAllImages = async (req, res) => {
    try {
        let images = await model.hinh_anh.findAll({
            attributes: ['duong_dan']
        });
        console.log(images);

        res.status(200).send(images);
        console.log('Get successfully');
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

const findImagesByName = async (req, res) => {
    try {
        let {keyword} = req.body;

        let result = await model.hinh_anh.findAll({
            attributes: ['duong_dan'],
            where: {
                ten_hinh: {
                    [Op.like]: `%${keyword}%`
                }
            }
        })
        console.log(result);

        res.status(200).send(result);
        result.length>=1 ? console.log('Get successfully') : console.log('No result matched'); 
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports = {getAllImages, findImagesByName}
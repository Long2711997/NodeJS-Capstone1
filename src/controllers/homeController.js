const { Op } = require('sequelize');
const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const {decryptToken} = require('../config/jwt')

const getAllImages = async (req, res) => {
    let { token } = req.headers;
    // let decodeToken = decryptToken(token)
    // let { nguoi_dung_id } = decodeToken.data;
    if (token){
        try {
            let data = await model.hinh_anh.findAll({
                attributes: ['duong_dan']
            });
            console.log(data);

            res.status(200).send(data);
            console.log('Get successfully');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402)
        console.log("User not found");
    }
}

const findImagesByName = async (req, res) => {
    let { token } = req.headers;
    
    if (token) {
        try {
            let { keyword } = req.body;

            if(keyword){
                let result = await model.hinh_anh.findAll({
                    attributes: ['duong_dan', 'ten_hinh'],
                    where: {
                        ten_hinh: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
                console.log(result);
                res.status(200).send(result);
                result.length >= 1 ? console.log('Get successfully') : console.log('No result matched');
            } else {
                res.status(500)
                console.log('Please input keyword');
            }
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402)
        console.log("User not found");
    }
    
}

module.exports = {getAllImages, findImagesByName}
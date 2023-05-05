const { Op } = require('sequelize');
const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);

const getImageDetail = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            let { hinh_id } = req.params;

            let data = await model.hinh_anh.findAll({
                where: { hinh_id },
                include: [{
                    model: model.nguoi_dung,
                    as: 'nguoi_dung'
                }]
            });
            console.log(data);

            res.status(200).send(data);
            data.length >= 1 ? console.log('Get successfully') : console.log('No result matched');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please login');
    }
    
}

const getImageComment = async (req, res) => {
    try {
        let { hinh_id } = req.params;

        let data = await model.binh_luan.findAll({
            where: { hinh_id },
            include: [{
                model: model.hinh_anh,
                where: {hinh_id},
                as: 'hinh',
                required: false
            }]
        });
        console.log(data);

        res.status(200).send(data);
        data.length >= 1 ? console.log('Get successfully') : console.log('This image has no any comments');
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

const getSaveInfo = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            let { hinh_id } = req.params;

            let data = await model.luu_anh.findOne({
                where: { hinh_id },
                include: [{
                    model: model.hinh_anh,
                    where: { hinh_id },
                    as: 'hinh',
                    required: false
                }]
            });
            console.log(data);

            res.status(200).send(data);
            data ? console.log('This image has been saved') : console.log('This image has not been saved');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please login');
    }    
} 

const comment = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            const { nguoi_dung_id, noi_dung, hinh_id } = req.body;

            let commentModel = {
                nguoi_dung_id,
                noi_dung,
                hinh_id
            }

            let commentData = await model.binh_luan.create(commentModel);
            console.log(commentData);

            res.status(200).send(commentData);
            console.log('Commented successful');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please login');
    }
}

module.exports = { getImageDetail, getImageComment, getSaveInfo, comment }
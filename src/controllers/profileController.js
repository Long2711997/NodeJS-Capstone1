const { Op } = require('sequelize');
const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const { decryptToken } = require('../config/jwt')

const getUser = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            // const { nguoi_dung_id } = req.params;

            let data = await model.nguoi_dung.findAll({
                where: { nguoi_dung_id }
            })

            res.status(200).send(data);
            console.log('Get Success');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please Login');
    }
}

const getSavedImageByUserId = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            // const { nguoi_dung_id } = req.params;

            let data = await model.luu_anh.findAll({
                where: { nguoi_dung_id }
            })
            console.log(data);

            res.status(200).send(data);
            data.length >= 1 ? console.log('Get successfully') : console.log('No result matched');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please Login');
    }
}

const getImageByUserId = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            // const { nguoi_dung_id } = req.params;

            let data = await model.hinh_anh.findAll({
                where: { nguoi_dung_id }
            })
            console.log(data);

            res.status(200).send(data);
            data.length >= 1 ? console.log('Get successfully') : console.log('No result matched');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please Login');
    }
}

const deleteImageById = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (decodeToken && decodeToken?.data) {
        try {
            const { hinh_id } = req.body;

            const data = await model.hinh_anh.findAll({
                where: { hinh_id, nguoi_dung_id }
            })
            res.sendStatus(200);
            console.log(data);
            
            if (data.length >= 1) {
                try {
                    await model.hinh_anh.destroy({
                        where: { hinh_id, nguoi_dung_id }
                    })
                    res.sendStatus(200);
                    console.log('Delete success');
                } catch (err) {
                    res.status(500);
                    console.log(err);
                }
            } else {
                // res.sendStatus(200);
                console.log('Nothing to delete');
            }
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please Login');
    }
}

const uploadNewImage = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            const { ten_hinh, duong_dan, mo_ta, nguoi_dung_id } = req.body;

            let uploadModel = {
                ten_hinh,
                duong_dan,
                mo_ta,
                nguoi_dung_id
            }

            let data = await model.hinh_anh.create(uploadModel);
            console.log(data);

            res.status(200).send(data);
            console.log('Upload success');
        } catch (err) {
            res.status(500).send(err)
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please Login');
    }
    
}

const updateProfile = async (req, res) => {
    let { token } = req.headers;
    let decodeToken = decryptToken(token)
    let { nguoi_dung_id } = decodeToken?.data || {};

    if (nguoi_dung_id) {
        try {
            let { nguoi_dung_id } = req.params;
            const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

            let updateModel = {
                email,
                mat_khau,
                ho_ten,
                tuoi,
                anh_dai_dien
            }

            let data = await model.nguoi_dung.update(updateModel, {
                where: { nguoi_dung_id }
            })

            console.log(data);

            res.status(200).send(data);
            console.log('Update success');
        } catch (err) {
            res.status(500).send(err)
            console.log(err);
        }
    } else {
        res.status(402);
        console.log('Please Login');
    }
}

module.exports = { getUser, getSavedImageByUserId, getImageByUserId, deleteImageById, uploadNewImage, updateProfile }
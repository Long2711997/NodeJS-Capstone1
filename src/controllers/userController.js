const {Op} = require('sequelize');
const initModels = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModels(sequelize);
const bcrypt = require('bcrypt');
const {createToken} = require('../config/jwt') 

const userSignUp = async (req, res) => {
    try {
        const {email, mat_khau, ho_ten, tuoi, anh_dai_dien} = req.body;

        let signUpModel = {
            email, 
            mat_khau: bcrypt.hashSync(mat_khau, 10), 
            ho_ten, 
            tuoi, 
            anh_dai_dien
        }

        let data = await model.nguoi_dung.create(signUpModel);
        console.log(data);

        res.status(200).send(data);
        console.log('Sign Up Success!');
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

const userLogin = async (req, res) => {
    try {
        let {email, mat_khau} = req.body;

        let checkEmail = await model.nguoi_dung.findOne({
            where: {
                email: email
            }
        })

        if (checkEmail) {
            let checkPass = bcrypt.compareSync(mat_khau, checkEmail.mat_khau)

            if (checkPass) {
                let token = createToken(checkEmail);
                res.status(200).send(token);
                console.log('Login success');
            } else {
                res.status(400);
                console.log('Invalid password');
            }
        } else {
            res.status(400).send('token');
            console.log('Invalid email');
        }
    } catch (err) {
        res.status(500).send(err);
        console.log('Something wrong happpened');
    }
}

module.exports = {userSignUp, userLogin}
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');

const UserImage = require("../models/UserImage");

cloudinary.config({
    cloud_name: "blockservices",
    api_key: 965751971587379,
    api_secret:"EpW5WYaHj-ReWRFAOuucatjBA1M"
});

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('file');

router.get("/", auth, async (req, res) => {
    try{
        let user = await UserImage.find({user: req.user.id}).sort({date: -1});
        if (user.length === 0) return res.status(404).json({msg: "Фотографии отсутствуют"});
        res.json(user[0]);
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Ошибка сервера');
    }
});

router.post('/', auth, function(req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(404).json({msg: "Размер изображения слишком больщой, максимальный размер 5мб."});
        }

        if (!req.file) {
            return res.status(404).json({msg: "Изображение не выбрано"});
        }

        cloudinary.v2.uploader.upload(req.file.path).then(async function(data){
            const img = await UserImage.findOneAndDelete({user: req.user.id});
            console.log(img);

            const newUserImage = new UserImage ({
                imgName: data.url,
                user: req.user.id
            });

            // сохраняем данные
            await newUserImage.save((error)=>{
                if(error){
                    console.log('error',error)
                }
                else{
                    res.json(newUserImage);
                }
            });
        }).catch(function(error){
            console.log(error);
        });
    })
});

module.exports = router;
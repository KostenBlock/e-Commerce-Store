const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const UserImage = require("../models/UserImage");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
});

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
    upload(req, res, async function (err) {
        try {
            // Удаляем предыдущию запись, чтобы не засорять коллекцию БД
            const img = await UserImage.findOneAndDelete({user: req.user.id});
            console.log(img)
            const newUserImage = new UserImage ({
                imgName: req.file.filename,
                user: req.user.id
            })
            const userImage = await newUserImage.save();
            res.json(userImage);
        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Ошибка сервера');
        }
    })
});

module.exports = router;
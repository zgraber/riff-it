const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

var filter = function (req, file,cb) {
    console.log(path.extension(file.originalname));
    if (path.extension(file.originalname) !== '.mp3' || path.extension(file.originalname) !== '.wav') {
        return cb(new Error('Only audio files are allowed'))
    }
  
    cb(null, true)
}

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region:'us-west-1'
});

var s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'riff-it',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString() + '-' + path.parse(file.originalname).name + '.mp3');
        }
    }),
    fileFilter: function (req, file,cb) {
        if (path.extname(file.originalname) !== '.mp3' && path.extname(file.originalname) !== '.wav') {
            console.log(path.extname(file.originalname));
            return cb(new Error('Only audio files are allowed'))
        }
      
        cb(null, true)
    }
});

module.exports = upload;
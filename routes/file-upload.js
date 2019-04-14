const express = require('express');
const router = express.Router();
const upload = require('../upload.js');

//Whatever is in quotes is what the body data is called
const singleUpload = upload.single('audio');

router.post('/audio-upload', function(req, res){
    singleUpload(req, res, function(err, some) {
        if(err) {
            return res.render('../views/uploader', {msg : err});
        } else {
            if(req.file == undefined) {
                res.render('../views/uploader', {msg : 'No file selected!'});
            } else {
                res.render('../views/uploader', {msg : 'File uploaded successfully!'});
            }
        }
    });

});

module.exports = router;
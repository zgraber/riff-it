const express = require('express');
const router = express.Router();
const upload = require('../upload.js');

//Whatever is in quotes is what the body data is called
const singleUpload = upload.single('audio');

router.post('/audio-upload', function(req, res){
    singleUpload(req, res, function(err, some) {
        if(err) {
            return res.status(442).send({errors: [{title: "Audio Upload Error", detail: err.message}] });
        }

        return res.json({'audioUrl': req.file.location});
    })
});

module.exports = router;
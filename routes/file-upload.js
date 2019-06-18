const express = require('express');
const router = express.Router();
const upload = require('../upload.js');

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');

//Whatever is in quotes is what the body data is called
const singleUpload = upload.single('audio');

router.get('/', function(req, res) {
    res.render('editor');
})

router.post('/', upload.single('audio'),function(req, res){
    let name = req.body.name;
    let contributor = req.body.contributor;
    /*singleUpload(req, res, function(err, some) {
        if(err) {
            return res.render('../views/uploader', {msg : err});
        } else {
            if(req.file == undefined) {
                res.render('../views/uploader', {msg : 'No file selected!'});
            } else {
                console.log(req.file.location);
                db.run(`INSERT INTO Songs (name, contributor, link) VALUES ( "${name}" , "${contributor}", "${req.file.location}" )`);
                res.render('../views/uploader', {msg : 'File uploaded successfully!'});
            }
        }
    }); */
    db.run(`INSERT INTO Songs (name, contributor, link) VALUES ( "${name}" , "${contributor}", "${req.file.location}" )`);
    res.render('../views/uploader', {msg : 'File uploaded successfully!'});

});

module.exports = router;
const express = require('express');
const app = express();
const path = require('path');

const fileUploadRouter = require('./routes/file-upload.js');

app.set('view engine', 'ejs');

app.use('/upload', fileUploadRouter);

app.get('/', function(req, res) {
    res.render('uploader');
});

app.listen(3000, function(){
    console.log('Server listening at port 3000');
})
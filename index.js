const express = require('express');
const app = express();

const fileUploadRouter = require('./routes/file-upload.js');

app.use('/upload', fileUploadRouter);

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log('Server listening at port 3000');
})
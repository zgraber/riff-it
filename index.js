const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');

const fileUploadRouter = require('./routes/file-upload.js');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS songs ("+
    "id INTEGER NOT NULL PRIMARY KEY," +
    "name TEXT NOT NULL," +
    "link TEXT NOT NULL," +
    "contributor TEXT)");
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

app.use('/upload', fileUploadRouter);


app.get('/', function(req, res) {
    res.render('uploader');
});

app.get('/home' , function(req, res) {
    let songs;
    db.all('SELECT name, id FROM songs', function(err, rows){
        if (err) {
            console.log(err);
            res.render('home', {songs: []});
        } else {
            songs = rows;
            console.log(songs);
            res.render('home', {songs: songs});
        }
    });
})

app.get('/player', function(req, res){
    let id = req.query.id;
    console.log('ID: ' + id);
    db.get(`SELECT name, contributor, link FROM songs WHERE id = ${id} `, function(err, row){
        console.log(row);
        res.render('player', {song: row})
    })
});

app.use(express.static(path.join(__dirname + '/public')));

app.listen(3000, function(){
    console.log('Server listening at port 3000');
});
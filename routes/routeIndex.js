const express = require('express');
var path = require("path");
const app = express();

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, "..", "screens", "login.html"));
    res.render('login')
    
});


module.exports = app;
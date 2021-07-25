const express = require('express');
var path = require("path");
const app = express();
const User = require('./../models/users')

app.get('/', (req, res) => {
    res.render('login')
});

app.post('/addUser', (req, res) => {
    //var user = new User(req.body);
    //console.log(user);
    res.send("listo");
    
});


module.exports = app;
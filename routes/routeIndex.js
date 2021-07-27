const express = require('express');
const app = express();
const User = require('./../models/users');

app.get('/', (req, res) => {
    res.render('login'); 
});

app.post('/addUser', async (req, res) => {
    
    var userExists = await User.findOne( {email: req.body.email });
    console.log(userExists);
    if (userExists == null) {
        var user = new User(req.body);
        await user.save();
         
    }
    return res.json(userExists);

});

app.post('/login', async (req, res) => {

    var userExists = await User.findOne( {email: req.body.email });
    if(userExists != null) {
        if (userExists.password == req.body.password){
            console.log(userExists.email);
            console.log(userExists.password);

            res.render('home', userExists);
        }else {
            //res.render('login', {fail: true});
        }
    } else {
        //res.render('login', {fail: true});
    }


     
});



module.exports = app;
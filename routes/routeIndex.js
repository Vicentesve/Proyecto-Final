const express = require('express');
const app = express();
const User = require('./../models/users');
var flash = require("connect-flash");
var jwt = require("jsonwebtoken");
const verify = require("../middlewhere/verifyAccess");

app.get('/login', (req, res) => {
    var message = req.flash('message')
    res.render('login', {message}) 
});

app.post('/login', async function(req,res){

    var email = req.body.email;
    var password = req.body.password;
    
    var user = await User.findOne({ email:email });
  
    //Si no existe
    if(!user) {
        req.flash('message', "-1");
        res.redirect('/login');
    }
    // Si existe, validar la contraseña
    else {
  
      var valid = await user.validatePassword(password);
  
      // Si la contraseña es valida. Crear un token
      if (valid) {
  
        var token = jwt.sign({id:user.email, permission:true},
            "*YYocr$bPZ!ZjdNxl%iASQX^w$tD5R",{expiresIn: "1h"});
        res.cookie("token",token, {httpOnly: true});
        res.redirect('/');
      }
      // Si no es valida
      else {
        req.flash('message', "0")
        res.redirect('/login');
      }
    }
});

app.get('/signup', (req, res) => {
    var message = req.flash('message')
    res.render('signup', { message } ); 
});

app.post('/addUser', async (req, res) => {
    
    var userExists = await User.findOne( {email: req.body.email });
    
    if (userExists == null) {
        var user = new User(req.body);
        user.password = user.encryptPassword(user.password);
        await user.save();
        var name = user.name + ' ' + user.lastName;
        req.flash('message', name);
        res.redirect('login');
    } else {
        req.flash('message','El usuario ya existe')
        res.redirect('signup');
    }
});

app.get('/', verify, async (req, res) => {
    var user = await User.find({email: req.userId});
    res.render('home',{user})
});

module.exports = app;
const express = require('express');
const app = express();
const User = require('./../models/users');
const Course = require('./../models/courses');
var flash = require("connect-flash");
var jwt = require("jsonwebtoken");
const verify = require("../middlewhere/verifyAccess");
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

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

app.get('/logOff',  async (req,res) =>{

    res.clearCookie("token");
    res.redirect('/');
});

app.get('/myCourses', verify, async (req, res) =>{
    var user = await User.find({email: req.userId});
    res.render('myCourses', {user});
});

app.get('/publishCourse', verify, async (req, res) => {
    var user = await User.find({email: req.userId});
    res.render('publishACourse', {user});
});

app.post('/publishCourse', upload.single('image'), verify, async(req, res) => {
    var user = await User.find({email: req.userId});
    console.log(req.file);
    var course = new Course(req.body);
});

module.exports = app;
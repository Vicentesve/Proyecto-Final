const express = require('express');
const app = express();
var path = require('path');
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

    Course.find({users: {$not: {$elemMatch: {userId: user[0]._id}}}}).sort({_id:-1}).exec(function(err, items) {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('home', { items: items, user });
        }
    });
});

app.get('/logOff',  async (req,res) =>{

    res.clearCookie("token");
    res.redirect('/');
});

app.get('/myCourses', verify, async (req, res) =>{
    var user = await User.find({email: req.userId});
    var items = await Course.find({users: {$elemMatch: {userId: user[0]._id}}});
    res.render('myCourses', {user, items});
});

app.get('/publishCourse', verify, async (req, res) => {
    var user = await User.find({email: req.userId});
    var message = req.flash('message')
    res.render('publishACourse', {user, message});
});

app.post('/publishCourse', upload.single('image'), verify, async(req, res) => {
    var user = await User.find({email: req.userId});
    var course = {
        name: req.body.name,
        description: req.body.description,
        professorName: user[0].name + ' ' + user[0].lastName,
        professorEmail: user[0].email,
        img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        users: [ {userId: user[0]._id} ]
    }

    var message = 'Your course ' + course.name + ' has been created successfully!';

    Course.create(course, async (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            await item.save();
            req.flash('message', message);
            res.redirect('publishCourse');
        }
    });
    
});

app.get('/registerCourse/:id', verify, async(req, res) => {
    var user = await User.find({email: req.userId});
    var id = req.params.id;
    await Course.updateOne({_id: id}, {$push: {users: {userId: user[0]._id}}});
    await User.updateOne({_id: user[0]._id}, {$push: {courses: {courseId: id}}});
    res.redirect('/')
});

app.get('/deleteCourse/:id', verify, async (req, res) => {
    var user = await User.find({email: req.userId});
    var idCourse = req.params.id;
    console.log(idCourse);
    if(user[0].role === true) {
        await Course.remove({_id: idCourse});
    }

    //await User.deleteOne({courses: {courseId: idCourse}});
    //await User.updateOne({$pull: {courses: {courseId: idCourse}}});
    await User.updateOne( { _id: user[0]._id }, { $pull: { courses: { courseId: idCourse } } } );
    await Course.updateOne( { _id: idCourse }, { $pull: { users: { userId: user[0]._id } } } );
    res.redirect('/myCourses');
    
});

app.post('/editCourse/:id', upload.single('image'), verify, async (req, res) => {
    var user = await User.find({email: req.userId});
    var course = await Course.find({_id:  req.params.id});
    console.log(course);
    var courseObj = {
        name: req.body.name,
        description: req.body.description,
        professorName: course[0].professorName,
        professorEmail: course[0].professorEmail,
        img: {
            data: course[0].img.data,
            contentType: 'image/png'
        },
        users: [ {userId: user[0]._id} ]
    }
    await Course.updateOne({_id: req.params.id}, courseObj);

    res.redirect('/myCourses');


});

module.exports = app;
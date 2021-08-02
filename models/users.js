var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = Schema ({
    name: String, 
    lastName: String, 
    email: String,
    password: String,
    role: {
        type: Boolean,
        default: false   //False is for students, True is for professors
    },
    courses: [
        {
            courseId: String
        }
    ]
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,10)
}

userSchema.methods.validatePassword = function(userpassword){
    return bcrypt.compare(userpassword,this.password)
}

module.exports = mongoose.model('users', userSchema);
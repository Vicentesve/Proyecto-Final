var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var userSchema = Schema ({
    name: String, 
    lastName: String, 
    email: String,
    password: String,
    role: {
        type: Boolean,
        default: false   //False is for students, True is for professors
    }
});

module.exports = mongoose.model('users', userSchema);
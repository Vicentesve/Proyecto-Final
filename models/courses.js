var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var courseSchema = Schema ({
    name: String, 
    description: String,
    professorName: String, 
    professorEmail: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    users: [
        {
            userId: String
        }
    ]
});

module.exports = mongoose.model('courses', courseSchema);


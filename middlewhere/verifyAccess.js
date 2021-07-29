var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    var token = req.cookies.token || '' ; 

    if (!token) {
        return res.redirect('login')
    }
    else {
        jwt.verify(token,
            "*YYocr$bPZ!ZjdNxl%iASQX^w$tD5R", function(err, data){
            if (err){
                console.log(err);
                return res.redirect('login')
            }
            else {
                req.userId = data.id;
                req.permission = data.permission;
                next();
            }
        });
    }
}


module.exports = verifyToken;
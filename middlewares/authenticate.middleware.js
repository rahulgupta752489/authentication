const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
    const token = req.headers.token;
    
    if(token) {
        const decoded_token = jwt.verify(token, "gupta");
        if(decoded_token) {
            const userID = decoded_token.userID;
            //console.log(decoded_token);
            req.body.userID = userID;
            next();
        }
        else {
            res.send("Please Login First")
        }
    }
    else {
        res.send("Please Login First")
    }
}

module.exports = {
    authenticate
};
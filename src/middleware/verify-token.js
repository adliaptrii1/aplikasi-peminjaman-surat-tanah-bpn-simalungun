const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("===================================");
    console.log("Verify Token");
    console.log("===================================");

    const authHeader = req.headers['authorization'];
    console.log(`authHeader = ${authHeader}`);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`token = ${token}`);
    if (token == null) return res.status(401).json({message: "Login terlebih dahulu!"})
    
    console.log("Authorized");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({message: "Login terlebih dahulu!"})
        }
        req.userId = user.userId;
        req.name = user.name;
        req.username = user.username;
        req.email = user.email;
        req.phone_number = user.phone_number;
        req.isAdmin = user.isAdmin;
        next();
    });
}

module.exports = verifyToken;
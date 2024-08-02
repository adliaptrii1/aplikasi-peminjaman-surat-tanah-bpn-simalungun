const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({message: "Login terlebih dahulu!"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({message: "Login terlebih dahulu!"})
        }
        req.name = user.name;
        req.username = user.username;
        req.email = user.email;
        req.phone_number = user.phone_number;
        req.isAdmin = user.isAdmin;
        next();
    });
}

module.exports = verifyToken;
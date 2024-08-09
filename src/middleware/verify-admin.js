const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({message: "Login terlebih dahulu!"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token login tidak valid" });
        if (user.isAdmin == 0) return res.status(401).json({message: "Akun Anda tidak berhak untuk mengakses!"})
        req.userId = user.userId;
        req.name = user.name;
        req.username = user.username;
        req.email = user.email;
        req.phone_number = user.phone_number;
        req.isAdmin = user.isAdmin;
        next();
    });
}

module.exports = isAdmin;
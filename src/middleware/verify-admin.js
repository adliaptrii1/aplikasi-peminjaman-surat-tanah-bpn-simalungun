const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({message: "Login terlebih dahulu!"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token login tidak valid" });
        if (user.isAdmin == false) return res.status(401).json({message: "Akun Anda tidak berhak untuk mengakses!"})
        next();
    });
}

module.exports = isAdmin;
const Users = require('../models/user');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    try {
        console.log("===================================");
        console.log("Refresh Token");
        console.log("===================================");
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken == null) return res.sendStatus(401);

        const user = await Users.findOne({ where: { refresh_token: refreshToken } });
        if (user == null) return res.sendStatus(403);

        console.log("Find User");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            console.log("Create Access Token");
            const userId = user.id;
            const username = user.username;
            const name = user.name;
            const email = user.email;
            const phoneNumber = user.phone_number;
            const isAdmin = user.isAdmin;
            const accessToken = jwt.sign({ userId, username, name, email, phoneNumber, isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
            res.json({ accessToken: accessToken });
        });

    } catch (error) {
        console.log(error);
    }

    
}

module.exports = refreshToken;
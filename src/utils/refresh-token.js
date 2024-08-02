const axios = require('axios');
const dotenv = require('dotenv');
const jwt_decode = require('jwt-decode');

dotenv.config();

var x = 0;

const refreshToken = async (req, res, next) => {

    try {
        const response = await axios.get('http://localhost:3000/api/token');
        console.log("Refresh Token");
        const accessToken = response.data.accessToken;

        console.log(`accessToken = ${accessToken}`);

        const decodedToken = jwt_decode(accessToken);

        req.isLogin = decodedToken.isLogin;
        req.name = decodedToken.name;
        req.username = decodedToken.username;
        req.email = decodedToken.email;
        req.isAdmin = decodedToken.isAdmin;
        req.expire = decodedToken.exp;

        // console.log(`isLogin = ${req.isLogin}`);
        // console.log(`name = ${req.name}`);
        // console.log(`username = ${req.username}`);
        // console.log(`email = ${req.email}`);
        // console.log(`isAdmin = ${req.isAdmin}`);
        // console.log(`expire = ${req.expire}`);
        // console.log("-----------------");

        next();
    } catch (error) {
        if (error.response.status === 401) {
            req.isLogin = false;
            next();
        } else {
            console.log(404);
            res.send(404);
        }
    }
}

module.exports = refreshToken;
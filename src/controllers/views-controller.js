const axios = require('axios');
const dotenv = require('dotenv');
const { response } = require('express');
const jwt_decode = require('jwt-decode');

dotenv.config();

const getAlertMessage = (req) => {
    const alertMessage = req.cookies.alertMessage;
    let message = '';
    let isDanger = false;
    if (alertMessage) {
        const alert = JSON.parse(alertMessage);
        message = alert.message;
        isDanger = alert.isDanger;
    }
    return { message, isDanger };
}

const renderViewIndex = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Home',
        message,
        isDanger
    });
    
}

const renderViewLogin = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('login', {
        layout : 'layouts/main-layout',
        title : 'Login',
        message, 
        isDanger,
    });
}

const LoginRequest = async (req, res) => {
    
    try {
        const url = `${process.env.URL}/api/login`;

        // Cari input username dan password dari form login
        

        const response = await axios.post(url, {
            // Cari id username dan password dari form login
            username: req.userrname,
            password: req.password
        });

        const { accessToken } = response.data;
        console.log(`accessToken = ${accessToken}`);

        token = accessToken;
        const decoded = jwt_decode(accessToken);
        req.isLogin = true;
        req.name = decoded.name;
        req.username = decoded.username;
        req.email = decoded.email;
        req.isAdmin = decoded.isAdmin;
        req.expire = decoded.exp;

        next();
    } catch (error) {
        if (error.response.status === 401) {
            console.log("Login false");
            isLogin = false;
            
            req.message = "Username atau password salah!";
            req.isDanger = true;
            
            message = "Username atau password salah!";
            isDanger = true;
            
            renderViewLogin(req, res, next, message, isDanger);
        } else {
            // console.log(404);
            console.log(error.response.status);
            res.send(error.response.status);
        }
    }
}



module.exports = {
    renderViewIndex, renderViewLogin, LoginRequest
}
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

const renderViewTambahPengajuan = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('pengajuan', {
        layout : 'layouts/main-layout',
        title : 'Tambah Pengajuan',
        message,
        isDanger,
    });
}

const renderViewPeminjaman = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('peminjaman', {
        layout : 'layouts/main-layout',
        title : 'Peminjaman',
        message,
        isDanger,
    });
}



module.exports = {
    renderViewIndex, 
    renderViewLogin, 
    renderViewTambahPengajuan, 
    renderViewPeminjaman
}
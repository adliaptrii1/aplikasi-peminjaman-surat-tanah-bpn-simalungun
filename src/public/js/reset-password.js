import createAlertMessage from "./utils/alert-message.js";
// const axios = require('axios');
const urlHost = 'http://localhost:3000/';
const url = new URL(window.location.href);
const token = url.searchParams.get('token');

document.getElementById('form-reset-password').addEventListener('submit',  async function(event)  {
    event.preventDefault();
    
    const password = await document.getElementById('password').value;
    const confirmPassword = await document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Password tidak sama!");
        return;
    }

    try {
        const response = await fetch(urlHost + 'api/reset-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({reset_pass_token: token, password}),
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        createAlertMessage("Kata sandi berhasil diubah");

        window.location.href = '/login';
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
    
});


// Cari div dengan id="email"
// TULIS KODE ini ketika halaman dimuat

import createAlertMessage from "./utils/alert-message.js";
// const axios = require('axios');
const url = 'http://localhost:3000/';
document.getElementById('form-forgot-password').addEventListener('submit',  async function(event)  {
    event.preventDefault();
    
    const email = await document.getElementById('email').value;

    try {
        const response = await fetch(url + 'api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email}),
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        createAlertMessage("Silahkan cek email untuk mengganti kata sandi akun Anda!");

        window.location.href = '/login';
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
    
});

// Listen Button ketika di klik (id from = "form-login")

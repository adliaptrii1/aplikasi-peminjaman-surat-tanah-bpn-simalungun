import createAlertMessage from "./utils/alert-message.js";
// const axios = require('axios');
const url = 'http://localhost:3000/';
document.getElementById('form-login').addEventListener('submit',  async function(event)  {
    event.preventDefault();
    
    console.log('Login');
    const username = await document.getElementById('username').value;
    const password = await document.getElementById('password').value;

    try {
        const response = await fetch(url + 'api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(data);

        window.location.href = '/'; // Redirect ke halaman utama
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
    
});

// Listen Button ketika di klik (id from = "form-login")

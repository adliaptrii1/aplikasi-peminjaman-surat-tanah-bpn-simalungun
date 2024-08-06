// const axios = require('axios');
const url = 'http://localhost:3000/';
document.getElementById('form-login').addEventListener('submit', function(event)  {
    event.preventDefault();
    
    console.log('Login');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // alert(`username = ${username}, password = ${password}`);
    
    fetch(url + 'api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    // Cek apakah response status = 200
    .then((response) => {
        if (!response.ok) {
            throw new Error('Login Gagal!');
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        // alert('Login Berhasil!');
        window.location.href = '/'; // Redirect ke halaman utama
    }).catch((error) => {
        console.log(error);
        // alert('Login Gagal!');
    });
    
});

// Listen Button ketika di klik (id from = "form-login")

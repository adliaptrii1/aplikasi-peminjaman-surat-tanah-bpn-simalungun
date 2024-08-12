// Listen form register
document.getElementById('form-register').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const nik = document.getElementById('nik').value;
    const phone_number = document.getElementById('phone-number').value
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Password tidak sama');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, username, nik, phone_number, address, password }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        alert('Registrasi berhasil');
        window.location.href = '/login';
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
});

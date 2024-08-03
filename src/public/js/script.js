let nama, username, email, isAdmin;

function LogoutSession() {
    alert("Logout!");
    // API : http://localhost:3000/api/logout
    fetch('http://localhost:3000/api/logout', {
        method: 'DELETE',
    }).then((response) => {
        // Jika respone status tidak sama dengan 200, maka akan kedirect ke halaman utama
        if (!response.ok) {
            throw new Error('Logout Gagal!');
        }

        alert('Logout Berhasil!');
    }).catch((error) => {
        console.log(error);
        alert('Logout Gagal!');
    }).finally(() => {
        window.location.href = '/'; // Redirect ke halaman utama
    });
}

function TambahPengajuan() {
    fetch('http://localhost:3000/api/token')
    .then(response => {
        if (response.status === 401) {
            throw new Error('Anda harus login terlebih dahulu!');
        } else if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }

        return response.json();
    }).then(data => {
        const accessToken = data.accessToken;
        const decodedToken = jwt_decode(accessToken);
        console.log(decodedToken);

        nama = decodedToken.name;
        username = decodedToken.username;
        email = decodedToken.email;
        isAdmin = decodedToken.isAdmin;

        window.location.href = '/pengajuan-tambah';
        
    }).catch(error => {

        // Buat cookies untuk alertMessage
        document.cookie = "alertMessage=" + JSON.stringify({
            message: error.message,
            isDanger: true
        }) + ";max-age=5";

        window.location.href = '/login';
    
    })
}

const refreshToken = async () => {
    console.log("Refresh Token");
    try {
        const response = await fetch('http://localhost:3000/api/token');
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        const data = await response.json();
        const accessToken = data.accessToken;
        const decodedToken = jwt_decode(accessToken);

        nama = decodedToken.name;
        username = decodedToken.username;
        email = decodedToken.email;
        isAdmin = decodedToken.isAdmin;
        console.log(decodedToken);

        document.getElementById('navbar-right').innerHTML = `
        <li class="nav-item dropdown profile-settings">
            <span class="profile-picture">
                <img src="/img/profile.png" class="rounded-circle" alt="profile" width="30px">
            </span>
            <a class="nav-link dropdown-toggle ps-3 pe-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="profile-name">
                    <!--.User-->${username}
                </span>
            </a>
            <ul class="dropdown-menu">
                <li><button class="dropdown-item" href="/profile/">My Profile</button></li>
                <li><button class="dropdown-item" href="/logout" onclick="LogoutSession()">Logout</button></li>
            </ul>
        </li>
        `;
        return accessToken;
    } catch (error) {
        document.getElementById('navbar-right').innerHTML = `
            <li class="nav-item login">
                <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item register">
                <a class="nav-link" href="/register">Register</a>
            </li>
        `;
        return null;
    }
}

function closeAlert() {
    // Hapus cookies untuk alertMessage
    document.cookie = "alertMessage=;max-age=0";
}

// Ambil nilai userId, nama, username, email, isAdmin, accessToken dari return refreshToken
// Membuat main program
(async () => {
    const accessToken = await refreshToken();
})();


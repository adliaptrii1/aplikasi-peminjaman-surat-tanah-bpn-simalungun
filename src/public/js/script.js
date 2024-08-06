let nama, username, email, isAdmin;

// const showModal = async (param) => {
//     // Get the modal
//     var modal = document.getElementById("modal");

//     // Get the <span> element that closes the modal
//     var span = document.getElementsByClassName("close-button")[0];

//     if (param === 1) {
//         document.querySelectorAll('.btn-primary').forEach(button => {
//         button.addEventListener('click', function() {
//             // Fetch history data based on the row data
//             var row = this.closest('tr');
//             var historyData = row.querySelector('td:nth-child(13)').textContent;

//             // Set the content of the modal
//             document.getElementById("modal-body").innerText = historyData;

//             // Display the modal
//             modal.style.display = "block";
//         });
//     });
//     }
//     // When the user clicks the button, open the modal
    

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//         modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }
// }


function LogoutSession() {
    // API : http://localhost:3000/api/logout
    fetch('http://localhost:3000/api/logout', {
        method: 'DELETE',
    }).then((response) => {
        // Jika respone status tidak sama dengan 200, maka akan kedirect ke halaman utama
        if (!response.ok) {
            throw new Error('Logout Gagal!');
        }

    }).catch((error) => {
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
        
        console.log('Refresh Token Done', accessToken);
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


// Fungsi untuk menambahkan kelas blur ke semua elemen kecuali div-light
function applyBlur() {
    console.log('applyBlur');
    const divs = document.querySelectorAll('div');
    divs.forEach(div => {
        // Kecuali dengan id="overlay-info"
        if (div.id !== 'overlay-info') {
            div.classList.add('blur');
        }
    });
}

// Fungsi untuk menghapus kelas blur dari semua elemen
function removeBlur() {
    const divs = document.querySelectorAll('div');
    divs.forEach(div => {
        div.classList.remove('blur');
    });
}

function closeAlert() {
    // Hapus cookies untuk alertMessage
    document.cookie = "alertMessage=;max-age=0";
}

// Ambil nilai userId, nama, username, email, isAdmin, accessToken dari return refreshToken
// Membuat main program
(async () => {
    // document.addEventListener('DOMContentLoaded', applyBlur);
    const accessToken = await refreshToken();
    
})();




function TambahOfficer() {
    // Cari elemen dengan id "overlay"
    const overlay = document.getElementById('overlay-info');

    overlay.innerHTML = `
    <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Tambah Data Penandatangan</h3>
        <hr class="text-dark">

        <form id="form-tambah-penandatangan">
            <div class="form-item mb-3 date-container" id="form-ubah-penandatangan">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <div class="form-item mb-3 date-container">
                <label for="position" class="form-label">Jabatan</label>
                
                <input type="text" class="form-control" id="position" name="position" required>
            </div>

            <div class="form-item mb-3 date-container">
                <label for="nip" class="form-label">NIP</label>
                <input type="text" class="form-control" id="nip" name="nip" required>
            </div>

            <div class="form-item mb-3 date-container">
                <label for="golongan" class="form-label">Golongan</label>
                <input type="text" class="form-control" id="golongan" name="golongan">  
            </div>

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlur()"></button>
    </div>
        `;

    // Masukkan
    overlay.style.display = 'fixed';

    console.log("Overlay");

    document.getElementById('form-tambah-penandatangan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        // Ubah nip menjadi integer
        const position = form.querySelector('#position').value;
        const nip = parseInt(form.querySelector('#nip').value);
        const golongan = form.querySelector('#golongan').value;

        const accessToken = await refreshToken();

        try {
            const response = await fetch('api/officers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name, position, nip, golongan }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Data penandatangan berhasil diubah!",
                isDanger: false,
            }) + ";max-age=5";

        } catch (error) {
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Data penandatangan gagal ditambahkan!",
                isDanger: true
            }) + ";max-age=5";
        }


        window.location.reload();
    });
}

function TambahUser() {
    // Cari elemen dengan id "overlay"
    const overlay = document.getElementById('overlay-info');

    overlay.innerHTML = `
    <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Tambah Data Pengguna</h3>
        <hr class="text-dark">

        <form id="form-tambah-pengguna">
            <div class="form-item mb-3 date-container" id="form-ubah-penandatangan">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <div class="form-item mb-3 date-container">
                <label for="username" class="form-label">Username</label>
                
                <input type="text" class="form-control" id="username" name="username" required>
            </div>

            <div class="form-item mb-3 date-container">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>

            <div class="form-item mb-3 date-container">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>  
            </div>

            <div class="form-item mb-3 date-container">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" id="role" name="role" required>
                    <option value=0>Pengguna</option>
                    <option value=1>Staff</option>
                    <option value=2>Admin</option>
                </select>
            <div>
                    

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlur()"></button>
    </div>
        `;

    // Masukkan
    overlay.style.display = 'fixed';

    console.log("Overlay");

    document.getElementById('form-tambah-pengguna').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        // Ubah nip menjadi integer
        const username = form.querySelector('#username').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const isAdmin = parseInt(form.querySelector('#role').value);
        

        const accessToken = await refreshToken();

        try {
            const response = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name, username, email, password, isAdmin}),
            });
            
            if (!response.ok) {
                alert(response.statusText)
                throw new Error(response.statusText);
            }
            
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Data pengguna berhasil ditambahkan!",
                isDanger: false,
            }) + ";max-age=5";

        } catch (error) {
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Data pengguna gagal ditambahkan!",
                isDanger: true
            }) + ";max-age=5";
        }

        window.location.reload();
    });
}


function updateOfficer(i) {
    // Cari elemen dengan id "overlay"
    const overlay = document.getElementById('overlay-info');

    // tBodyData merupakan string HTML yang akan diisi ke dalam tbody
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const row = rows[i].querySelectorAll('td');

    overlay.innerHTML = `
    <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Ubah Data Penandatangan</h3>
        <hr class="text-dark">

        <form id="form-ubah-penandatangan">
            <div class="form-item mb-3 date-container" id="form-ubah-penandatangan">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" value="${row[1].textContent}" required> 
            </div>

            <div class="form-item mb-3 date-container">
                <label for="position" class="form-label">Jabatan</label>
                
                <input type="text" class="form-control" id="position" name="position" value="${row[2].textContent}" required>
            </div>

            <div class="form-item mb-3 date-container">
                <label for="nip" class="form-label">NIP</label>
                <input type="text" class="form-control" id="nip" name="nip" value="${row[3].textContent}" required>
            </div>

            <div class="form-item mb-3 date-container">
                <label for="golongan" class="form-label">Golongan</label>
                <input type="text" class="form-control" id="golongan" name="golongan" value="${row[4].textContent}">  
            </div>

            <button type="submit" class="btn btn-success">Ubah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlur()"></button>
    </div>
        `;

    // Masukkan
    overlay.style.display = 'fixed';
    console.log("Overlay");
    // Tambahkan kelas blur ke semua elemen
    // applyBlur();
    document.getElementById('form-ubah-penandatangan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");
    
        const form = e.target;
        const id = form.getAttribute('data-id');
        const name = form.querySelector('#name').value;
        // Ubah nip menjadi integer
        const position = form.querySelector('#position').value;
        const nip = parseInt(form.querySelector('#nip').value);
        const golongan = form.querySelector('#golongan').value;
    
        const accessToken = await refreshToken();
        // alert(accessToken);
    
        try {
            const response = await fetch(`api/officers/${parseInt(row[6].textContent)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name, position, nip, golongan }),
            });
        
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Data penandatangan berhasil diubah!",
                isDanger: false,
            }) + ";max-age=5";
                // } else {
            //     document.cookie = "alertMessage=" + JSON.stringify({
            //         message: error.status + error.message,
            //         isDanger: true
            //     }) + ";max-age=5";
            // }
        } catch (error) {
            console.log(error);
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Data penandatangan gagal diubah!",
                isDanger: true
            }) + ";max-age=5";
        }
        // alert(`id = ${row[6].textContent}`);
        

        window.location.reload();
        
    });
}

async function deleteOfficer(id) {
    console.log("Accept Request-", id);
    // Berikan alert namun ada dua pilihan
    const confirm = window.confirm('Apakah Anda yakin ingin menghapus jabatan ini?');
    console.log(`confirm: ${confirm}`);
    if (!confirm) return;

    const accessToken = await refreshToken();

    try {
        const response = await fetch(`http://localhost:3000/api/officers/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Berikan alert bahwa pengajuan berhasil diterima
        alert('Pengajuan berhasil diterima');

        // Refresh halaman
        document.cookie = "alertMessage=" + JSON.stringify({
            message: "Pengajuan berhasil diterima",
            isDanger: false
        }) + ";max-age=5";

        window.location.reload();


    } catch (error) {
        console.log(error);

        document.cookie = "alertMessage=" + JSON.stringify({
            message: error.status + error.message,
            isDanger: true
        }) + ";max-age=5";

        window.location.reload();   
    }
}

// Listen perubahan pada form ubah penandatangan

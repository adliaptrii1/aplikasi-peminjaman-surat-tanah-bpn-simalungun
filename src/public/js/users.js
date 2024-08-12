import TablePengguna from './models/table-pengguna.js';
import refreshToken from './utils/refresh-token.js';
import { removeBlur } from './utils/blur-effect.js';
import TambahPengajuan from './controllers/pengajuan-controller.js';
import createAlertMessage from './utils/alert-message.js';

const pengguna = await refreshToken();

if (!pengguna) {
    createAlertMessage("Login terlebih dahulu!", true);

    window.location.href = '/login';
}

if (pengguna.getIsAdmin() != 2) {
    createAlertMessage("Anda tidak memiliki akses!", true);

    window.location.href = '/login';
}


const tablePengguna = await new TablePengguna();

await tablePengguna.setListPenggunaFromAPI();

console.log(tablePengguna.getListPengguna());

tablePengguna.setUpTable();

function removeBlurAction() {
    removeBlur();
}

function tambahPengajuan() {
    TambahPengajuan();
}


function sortTable() {
    // console.log("sorting");
    const sortBy = document.getElementById('sort-by').value;
    const sortType = document.getElementById('sort-type').value;

    if (!sortBy || !sortType) {
        return;
    }

    tablePengguna.sortTablePengguna(sortBy, parseInt(sortType) % 2 === 1);

    tablePengguna.setUpTable();
}

async function TambahUser(idx) {

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert" id="modal">
        <h3 class="alert-heading">Tambah Data Pengguna</h3>
        <hr class="text-dark">

        <form id="form-tambah-pengguna">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="username" class="form-label">Username</label>
                
                <input type="text" class="form-control" id="username" name="username" required>
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email" required>
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="phone_number" class="form-label">Nomor Telepon</label>
                <input type="text" class="form-control" id="phone_number" name="phone_number">  
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="nik" class="form-label">NIK</label>
                <input type="text" class="form-control" id="nik" name="nik" value="" >  
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" name="address" value="" >  
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="role" class="form-label">Role</label>
                <select id="role" class="form-select" required>
                    <option value=1>Staff</option>
                    <option value=0>User</option>
                </select>
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" required>
            </div>

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tablePengguna.showAlertContent(overlayContent);

    document.getElementById('form-tambah-pengguna').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        // Ubah nip menjadi integer
        const username = form.querySelector('#username').value;
        const email = form.querySelector('#email').value;
        const phone_number = form.querySelector('#phone_number').value;
        const nik = form.querySelector('#nik').value;
        const address = form.querySelector('#address').value;
        const isAdmin = form.querySelector('#role').value;
        const password = form.querySelector('#password').value;
        const confirmPassword = form.querySelector('#password_confirmation').value;
        
        console.log(name, username, email, phone_number, isAdmin, password, confirmPassword);

        const pengguna = await refreshToken();

        try {
            const response = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name, username, email, phone_number, nik, address, isAdmin, password, confirmPassword }),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }
            
            createAlertMessage("Data pengguna berhasil ditambahkan!", false);

            window.location.reload();
        } catch (error) {
            createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}

async function editPengguna(idx) {
    // console.log("Edit pengguna dengan index : " + idx);  
    const pengguna = tablePengguna.getListPengguna().getPenggunaByIdx(idx);

    let option = '';

    if (pengguna.getIsAdmin() == 1) {
        option = `
            <option value=1 selected>Staff</option>
            <option value=0>User</option>
        `;
    }
    else
    if (pengguna.getIsAdmin() == 0) {
        option = `
            <option value=1>Staff</option>
            <option value=0 selected>User</option>
        `;
    }

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert" id="modal">
        <h3 class="alert-heading">Edit Data Pengguna</h3>
        <hr class="text-dark">

        <form id="form-edit-pengguna">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required value="${pengguna.getNama()}" > 
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="username" class="form-label">Username</label>
                
                <input type="text" class="form-control" id="username" name="username" required value="${pengguna.getUsername()}" >
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email" required value="${pengguna.getEmail()}" >
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="phone_number" class="form-label">Nomor Telepon</label>
                <input type="text" class="form-control" id="phone_number" name="phone_number" value="${pengguna.getPhoneNumber()}" >  
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="nik" class="form-label">NIK</label>
                <input type="text" class="form-control" id="nik" name="nik" value="${pengguna.getNIK()}" >  
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" name="address" value="${pengguna.getAddress()}" >  
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay" >
                <label for="role" class="form-label">Role</label>
                <select id="role" class="form-select" required>
                    ${option}
                </select>
            </div>

            <button type="submit" class="btn btn-success">Ubah</button>
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tablePengguna.showAlertContent(overlayContent);

    document.getElementById('form-edit-pengguna').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const confirm = window.confirm("Apakah Anda yakin ingin mengubah data pengguna ini?");

        if (!confirm) {
            return;
        }

        const form = e.target;
        const name = form.querySelector('#name').value;
        const username = form.querySelector('#username').value;
        const email = form.querySelector('#email').value;
        const phone_number = form.querySelector('#phone_number').value;
        const isAdmin = form.querySelector('#role').value;
        const nik = form.querySelector('#nik').value;
        const address = form.querySelector('#address').value;

        const penggunaRefreshToken = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            console.log(pengguna);
            const response = await fetch(`api/users/${pengguna.getId()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${penggunaRefreshToken.getAccessToken()}`,
                },
                body: JSON.stringify({ name, username, email, phone_number, isAdmin, nik, address }),
            });

            if (!response.ok) {
                
                const err = await response.json();
                throw new Error(`${err.message}`);
            }
            
            createAlertMessage("Data penandatangan berhasil diubah!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}


async function deletePengguna(idx) {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus data penandatangan ini?");

    if (!confirm) {
        return;
    }

    const pengguna = tablePengguna.getListPengguna().getPenggunaByIdx(idx);

    const penggunaRefreshToken = await refreshToken();

    try {
        const response = await fetch(`api/users/${pengguna.getId()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${penggunaRefreshToken.getAccessToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        createAlertMessage("Data penandatangan berhasil dihapus!", false);

        window.location.reload();
    } catch (error) {
        console.log(error);

        createAlertMessage(error.message, true);

        window.location.reload();
    }
}

// Listen perubahan pada element dengan id="sort-by" dan id="sort-type"
document.getElementById('sort-by').addEventListener('change', sortTable);
document.getElementById('sort-type').addEventListener('change', sortTable);
document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Tambahkan query parameter "?search=<value>" pada URL
        console.log("search");
        const searchValue = document.getElementById('search').value;
        const url = new URL(window.location.href);
        url.searchParams.set('search', searchValue);
        window.location.href = url.href;
    }
}

);


window.removeBlurAction = removeBlurAction;

window.TambahUser = TambahUser;
window.editPengguna = editPengguna;
window.deletePengguna = deletePengguna;
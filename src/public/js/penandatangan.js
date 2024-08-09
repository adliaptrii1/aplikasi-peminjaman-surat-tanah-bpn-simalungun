import TableOfficers from './models/table-officers.js';
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

const tableOfficers = await new TableOfficers();

await tableOfficers.setListOfficerFromAPI();

console.log(tableOfficers.getListOfficer());

tableOfficers.setUpTable();

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

    tableOfficers.sortTableOfficers(sortBy, parseInt(sortType) % 2 === 1);

    tableOfficers.setUpTable();
}

async function TambahOfficer(idx) {

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Tambah Data Penandatangan</h3>
        <hr class="text-dark">

        <form id="form-tambah-penandatangan">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="position" class="form-label">Jabatan</label>
                
                <input type="text" class="form-control" id="position" name="position" required>
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="nip" class="form-label">NIP</label>
                <input type="text" class="form-control" id="nip" name="nip" required>
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="golongan" class="form-label">Golongan</label>
                <input type="text" class="form-control" id="golongan" name="golongan">  
            </div>

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableOfficers.showAlertContent(overlayContent);

    document.getElementById('form-tambah-penandatangan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        // Ubah nip menjadi integer
        const position = form.querySelector('#position').value;
        const nip = (form.querySelector('#nip').value);
        const golongan = form.querySelector('#golongan').value;

        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            const response = await fetch('api/officers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name, position, nip, golongan }),
            });

            if (!response.ok) {
                
                const err = await response.json();
                throw new Error(`${err.message}`);
            }
            
            createAlertMessage("Data penandatangan berhasil ditambahkan!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}

async function editOfficer(idx) {
    // console.log("Edit officer dengan index : " + idx);  
    const officer = tableOfficers.getListOfficer().getOfficerByIdx(idx);

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Edit Data Penandatangan</h3>
        <hr class="text-dark">

        <form id="form-edit-penandatangan">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required value="${officer.getName()}"> 
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="position" class="form-label">Jabatan</label>
                
                <input type="text" class="form-control" id="position" name="position" required value="${officer.getPosition()}">
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="nip" class="form-label">NIP</label>
                <input type="text" class="form-control" id="nip" name="nip" required value="${officer.getNip()}">
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="golongan" class="form-label">Golongan</label>
                <input type="text" class="form-control" id="golongan" name="golongan" value="${officer.getGolongan()}">  
            </div>

            <button type="submit" class="btn btn-success">Ubah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableOfficers.showAlertContent(overlayContent);

    document.getElementById('form-edit-penandatangan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const confirm = window.confirm("Apakah Anda yakin ingin mengubah data penandatangan ini?");

        if (!confirm) {
            return;
        }

        const form = e.target;
        const name = form.querySelector('#name').value;
        // Ubah nip menjadi integer
        const position = form.querySelector('#position').value;
        const nip = (form.querySelector('#nip').value);
        const golongan = form.querySelector('#golongan').value;

        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            console.log(officer);
            alert("Tahan");
            const response = await fetch(`api/officers/${officer.getId()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name, position, nip, golongan }),
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


async function deleteOfficer(idx) {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus data penandatangan ini?");

    if (!confirm) {
        return;
    }

    const officer = tableOfficers.getListOfficer().getOfficerByIdx(idx);

    const pengguna = await refreshToken();

    try {
        const response = await fetch(`api/officers/${officer.getId()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${pengguna.getAccessToken()}`,
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

window.TambahOfficer = TambahOfficer;
window.editOfficer = editOfficer;
window.deleteOfficer = deleteOfficer;
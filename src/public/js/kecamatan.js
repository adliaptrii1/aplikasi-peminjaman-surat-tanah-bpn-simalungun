import TableKecamatan from './models/table-kecamatan.js';
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

const tableKecamatan = await new TableKecamatan();

await tableKecamatan.setListKecamatanFromAPI();

console.log(tableKecamatan.getListKecamatan());

tableKecamatan.setUpTable();

function removeBlurAction() {
    removeBlur();
}

function tambahPengajuan() {
    TambahPengajuan();
}


function sortTable() {
    console.log("sorting");
    const sortType = document.getElementById('sort-type').value;


    tableKecamatan.sortTableKecamatan(parseInt(sortType) % 2 === 1);

    tableKecamatan.setUpTable();
}

async function TambahKecamatan(idx) {

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Tambah Data Kecamatan</h3>
        <hr class="text-dark">

        <form id="form-tambah-kecamatan">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableKecamatan.showAlertContent(overlayContent);

    document.getElementById('form-tambah-kecamatan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        
        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            const response = await fetch('api/kecamatan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                
                const err = await response.json();
                throw new Error(`${err.message}`);
            }
            
            createAlertMessage("Data kecamatan berhasil ditambahkan!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}

async function editKecamatan(idx) {
    // console.log("Edit kecamatan dengan index : " + idx);  
    const kecamatan = tableKecamatan.getListKecamatan().getKecamatanByIdx(idx);

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Edit Data Kecamatan</h3>
        <hr class="text-dark">

        <form id="form-edit-kecamatan">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required value="${kecamatan.getName()}"> 
            </div>

            <button type="submit" class="btn btn-success">Ubah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableKecamatan.showAlertContent(overlayContent);

    document.getElementById('form-edit-kecamatan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const confirm = window.confirm("Apakah Anda yakin ingin mengubah data kecamatan ini?");

        if (!confirm) {
            return;
        }

        const form = e.target;
        const name = form.querySelector('#name').value;

        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            console.log(kecamatan);
            alert("Tahan");
            const response = await fetch(`api/kecamatan/${kecamatan.getId()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name}),
            });

            if (!response.ok) {
                
                const err = await response.json();
                throw new Error(`${err.message}`);
            }
            
            createAlertMessage("Data kecamatan berhasil diubah!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}


async function deleteKecamatan(idx) {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus data kecamatan ini?");

    if (!confirm) {
        return;
    }

    const kecamatan = tableKecamatan.getListKecamatan().getKecamatanByIdx(idx);

    const pengguna = await refreshToken();

    try {
        const response = await fetch(`api/kecamatan/${kecamatan.getId()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${pengguna.getAccessToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        createAlertMessage("Data kecamatan berhasil dihapus!", false);

        window.location.reload();
    } catch (error) {
        console.log(error);

        createAlertMessage(error.message, true);

        window.location.reload();
    }
}


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

window.TambahKecamatan = TambahKecamatan;
window.editKecamatan = editKecamatan;
window.deleteKecamatan = deleteKecamatan;
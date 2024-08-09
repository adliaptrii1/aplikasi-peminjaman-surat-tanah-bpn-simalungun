import TableRightsType from './models/table-rights-type.js';
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

const tableRightsType = await new TableRightsType();

await tableRightsType.setListRightsTypeFromAPI();

console.log(tableRightsType.getListRightsType());

tableRightsType.setUpTable();

function removeBlurAction() {
    removeBlur();
}

function tambahPengajuan() {
    TambahPengajuan();
}


function sortTable() {
    console.log("sorting");
    const sortType = document.getElementById('sort-type').value;


    tableRightsType.sortTableRightsType(parseInt(sortType) % 2 === 1);

    tableRightsType.setUpTable();
}

async function TambahRightsType(idx) {

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Tambah Data Tipe Hak</h3>
        <hr class="text-dark">

        <form id="form-tambah-rights-type">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableRightsType.showAlertContent(overlayContent);

    document.getElementById('form-tambah-rights-type').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        
        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            const response = await fetch('api/rights-type', {
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
            
            createAlertMessage("Data tipe hak berhasil ditambahkan!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}

async function editRightsType(idx) {
    // console.log("Edit rightsType dengan index : " + idx);  
    const rightsType = tableRightsType.getListRightsType().getRightsTypeByIdx(idx);

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Edit Data Tipe Hak</h3>
        <hr class="text-dark">

        <form id="form-edit-rights-type">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required value="${rightsType.getName()}"> 
            </div>

            <button type="submit" class="btn btn-success">Ubah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableRightsType.showAlertContent(overlayContent);

    document.getElementById('form-edit-rights-type').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const confirm = window.confirm("Apakah Anda yakin ingin mengubah data tipe hak ini?");

        if (!confirm) {
            return;
        }

        const form = e.target;
        const name = form.querySelector('#name').value;

        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            console.log(rightsType);
            alert("Tahan");
            const response = await fetch(`api/rights-type/${rightsType.getId()}`, {
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
            
            createAlertMessage("Data tipe hak berhasil diubah!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}


async function deleteRightsType(idx) {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus data tipe hak ini?");

    if (!confirm) {
        return;
    }

    const rightsType = tableRightsType.getListRightsType().getRightsTypeByIdx(idx);

    const pengguna = await refreshToken();

    try {
        const response = await fetch(`api/rights-type/${rightsType.getId()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${pengguna.getAccessToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        createAlertMessage("Data tipe hak berhasil dihapus!", false);

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

window.TambahRightsType = TambahRightsType;
window.editRightsType = editRightsType;
window.deleteRightsType = deleteRightsType;
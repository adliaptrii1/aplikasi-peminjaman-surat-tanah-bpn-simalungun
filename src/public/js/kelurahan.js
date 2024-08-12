import TableKelurahan from './models/table-kelurahan.js';
import refreshToken from './utils/refresh-token.js';
import { removeBlur } from './utils/blur-effect.js';
import TambahPengajuan from './controllers/pengajuan-controller.js';
import createAlertMessage from './utils/alert-message.js';
import ListKecamatan from './models/list-kecamatan.js';
import ListKelurahan from './models/list-kelurahan.js';

const pengguna = await refreshToken();

if (!pengguna) {
    createAlertMessage("Login terlebih dahulu!", true);

    window.location.href = '/login';
}

if (pengguna.getIsAdmin() != 2) {
    createAlertMessage("Anda tidak memiliki akses!", true);

    window.location.href = '/login';
}

const listKecamatan = await new ListKecamatan();

await listKecamatan.setListKecamatanFromAPI();

const kecamatanType = document.getElementById('kecamatan-type');

// Ambil data kecamatan dari listKecamatan
const kecamatan = listKecamatan.getListKecamatan();


for (let i = 0; i < kecamatan.length; i++) {
    const option = document.createElement('option');
    option.value = kecamatan[i].getId();
    option.text = kecamatan[i].getName();
    
    kecamatanType.appendChild(option);
}

const tableKelurahan = await new TableKelurahan();

await tableKelurahan.setListKelurahanFromAPI();

console.log(tableKelurahan.getListKelurahan());

tableKelurahan.setUpTable();

function removeBlurAction() {
    removeBlur();
}

function tambahPengajuan() {
    TambahPengajuan();
}


function sortTable() {
    console.log("sorting");
    const sortType = document.getElementById('sort-type').value;


    tableKelurahan.sortTableKelurahan(parseInt(sortType) % 2 === 1);

    tableKelurahan.setUpTable();
}

async function TambahKelurahan(idx) {

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert" id="modal">
        <h3 class="alert-heading">Tambah Data Kelurahan</h3>
        <hr class="text-dark">

        <form id="form-tambah-kelurahan">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required> 
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="kecamatan" class="form-label">Kecamatan</label>
                <select id="kecamatan" class="form-control form-select" required>
                    ${kecamatan.map((elm, i) => `<option value="${elm.getId()}">${elm.getName()}</option>`).join('')}
                </select>
            </div>

            <button type="submit" class="btn btn-success">Tambah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableKelurahan.showAlertContent(overlayContent);

    document.getElementById('form-tambah-kelurahan').addEventListener('submit', async function (e) {
        e.preventDefault();
        // alert("Submit");

        const form = e.target;
        const name = form.querySelector('#name').value;
        const id_kecamatan = form.querySelector('#kecamatan').value;
        
        const pengguna = await refreshToken();
        console.log(pengguna.getAccessToken());

        try {
            const response = await fetch('api/kelurahan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name, id_kecamatan }),
            });

            if (!response.ok) {
                alert(response.statusText);
                const err = await response.json();
                throw new Error(`${err.message}`);
            }
            
            createAlertMessage("Data kelurahan berhasil ditambahkan!", false);

            window.location.reload();
        } catch (error) {

            await createAlertMessage(error.message, true);
            console.log("Reload");
            window.location.reload();
        }
    });
}

async function editKelurahan(idx) {
    // console.log("Edit kelurahan dengan index : " + idx);  
    const kelurahan = tableKelurahan.getListKelurahan().getKelurahanByIdx(idx);

    const optionContent = kecamatan.map((elm, i) => {
        if (elm.getId() === kelurahan.getIdKecamatan()) {
            return `<option value="${elm.getId()}" selected>${elm.getName()}</option>`;
        } else {
            return `<option value="${elm.getId()}">${elm.getName()}</option>`;
        }
    }).join('');

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert" id="modal">
        <h3 class="alert-heading">Edit Data Kelurahan</h3>
        <hr class="text-dark">

        <form id="form-edit-kelurahan">
            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="name" class="form-label">Nama</label>
                <input type="text" class="form-control" id="name" name="name" required value="${kelurahan.getName()}"> 
            </div>

            <div class="form-item mb-3 date-container" id="form-overlay">
                <label for="kecamatan" class="form-label">Kecamatan</label>
                <select id="kecamatan" class="form-control form-select" required>
                    ${optionContent}
                </select>
            </div>


            <button type="submit" class="btn btn-success">Ubah</button>
            
        </form>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableKelurahan.showAlertContent(overlayContent);

    document.getElementById('form-edit-kelurahan').addEventListener('submit', async function (e) {
        e.preventDefault();

        const confirm = window.confirm("Apakah Anda yakin ingin mengubah data kelurahan ini?");
        if (!confirm) {
            return;
        }

        const form = e.target;
        const name = form.querySelector('#name').value;
        const id_kecamatan = form.querySelector('#kecamatan').value;

        const pengguna = await refreshToken();

        try {
            const response = await fetch(`api/kelurahan/${kelurahan.getId()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pengguna.getAccessToken()}`,
                },
                body: JSON.stringify({ name, id_kecamatan }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            createAlertMessage("Data kelurahan berhasil diubah!", false);

            window.location.reload();
        } catch (error) {
            console.log(error);

            createAlertMessage(error.message, true);

            window.location.reload();
        }
    });
    
}


async function deleteKelurahan(idx) {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus data kelurahan ini?");

    if (!confirm) {
        return;
    }

    const kelurahan = tableKelurahan.getListKelurahan().getKelurahanByIdx(idx);

    const pengguna = await refreshToken();

    try {
        const response = await fetch(`api/kelurahan/${kelurahan.getId()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${pengguna.getAccessToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        createAlertMessage("Data kelurahan berhasil dihapus!", false);

        window.location.reload();
    } catch (error) {
        console.log(error);

        createAlertMessage(error.message, true);

        window.location.reload();
    }
}

async function selectKecamatan() {
    console.log("select kecamatan");
    const kecamatanType = document.getElementById('kecamatan-type');
    const kecamatanId = kecamatanType.value;

    await tableKelurahan.setListKelurahanFromAPI("?id_kecamatan=" + (kecamatanId));
    tableKelurahan.setUpTable();

}


document.getElementById('sort-type').addEventListener('change', sortTable);
document.getElementById('kecamatan-type').addEventListener('change', selectKecamatan);

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

window.TambahKelurahan = TambahKelurahan;
window.editKelurahan = editKelurahan;
window.deleteKelurahan = deleteKelurahan;
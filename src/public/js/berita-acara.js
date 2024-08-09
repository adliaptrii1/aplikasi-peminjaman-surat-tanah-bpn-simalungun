import TableLoans from './models/table-loans.js';
import refreshToken from './utils/refresh-token.js';
import { removeBlur } from './utils/blur-effect.js';
import TambahPengajuan from './controllers/pengajuan-controller.js';
import createAlertMessage from './utils/alert-message.js';
import { dateToString } from './utils/datetime-to-string.js';

const user = await refreshToken();

if (!user) {
    createAlertMessage("Login terlebih dahulu!", true);

    window.location.href = '/login';
}

const tableLoans = await new TableLoans("berita-acara", user.getIsAdmin());

await tableLoans.setListLoanFromAPI("?list=4");

tableLoans.setUpTable();

function showHistory(index) {
    console.log("Show History dengan index : " + index);
    tableLoans.showHistory(index);
    // Perintah ini dijalankan ketika tombol "Show History" diklik
}

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

    tableLoans.sortTableLoans(sortBy, parseInt(sortType) % 2 === 1);

    tableLoans.setUpTable();
}

async function printBA(idx) {
    console.log("Print BA dengan index : " + idx);
    const user = await refreshToken();

    try {
        const responseOfficers = await fetch('http://localhost:3000/api/officers', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user.getAccessToken(),
                'Content-Type': 'application/json'
            }
        }); 

        if (!responseOfficers.ok) {
            throw new Error(responseOfficers.statusText);
        }

        const officers = await responseOfficers.json();

        const overlayContent = `
            <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
                <h3 class="alert-heading">Cetak Berita Acara</h3>
                <hr class="text-dark">
                
                <form id="form-cetak-ba">
                        <div class="form-item mb-3 date-container" id="form-overlay">
                            <label for="officer" class="form-label">Pilih sebagai Pihak Pertama : </label>
                            <select id="officer" class="form-select" required>
                                ${officers.map((officer, i) => `<option value="${i}">${officer.name}</option>`).join('')}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-success">Cetak</button>
                    </form>
                    <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
                </div>
            `;
        
        tableLoans.showAlertContent(overlayContent);

        document.getElementById('form-cetak-ba').addEventListener('submit', async function(event) {
            event.preventDefault();

            const officerIdx = document.getElementById('officer').value;

            const officer = officers[officerIdx];

            // Data yang akan dimasukkan dalam body request dalam bentuk JSON 
            // Format :
            // {
            //     hari : <hari>,
            //     tanggal : <tanggal>,
            //     tanggal_string : <hari_string>,
            //     bulan : <bulan>,
            //     tahun : <tahun>,
            //     nama_pengurus : <nama_pengurus>,
            //     nama_peminjam : <nama_peminjam>,
            //     nip_pengurus : <nip_pengurus>,
            //     jabatan_pengurus : <jabatan_pengurus>,
            //     kecamatan : <kecamatan>,
            //     kecamatan_caps : <kecamatan_caps>,
            //     kelurahan : <kelurahan>,
            //     kelurahan_caps : <kelurahan_caps>,
            //     berkas : <berkas>,
            //     berkas_caps : <berkas_caps>,
            //     kondisi : <kondisi>,
            // }

            const date = new Date();
            const tanggal = date.getUTCDate();
            const year = date.getUTCFullYear();
            const hari = date.toLocaleDateString('id-ID', { weekday: 'long' });
            const bulan = date.toLocaleDateString('id-ID', { month: 'long' });
            const tanggal_string = dateToString(parseInt(tanggal))

            console.log(tableLoans.getLoanByIdx(idx));
            console.log(tableLoans.getLoanByIdx(idx).getNameUser());

            const nama_pengurus = officer.name;
            const nama_peminjam = tableLoans.getLoanByIdx(idx).getNameUser();
            const nip_pengurus = officer.nip;
            const jabatan_pengurus = officer.position;
            const kecamatan = tableLoans.getLoanByIdx(idx).getKecamatan();
            const kecamatan_caps = kecamatan.toUpperCase();
            const kelurahan = tableLoans.getLoanByIdx(idx).getKelurahan();
            const kelurahan_caps = kelurahan.toUpperCase();
            const berkas = tableLoans.getLoanByIdx(idx).getFile().toLowerCase();
            const berkas_caps = berkas.toUpperCase();
            const kondisi = tableLoans.getLoanByIdx(idx).getStatus().toLowerCase();

            if (kondisi === "selesai") kondisi = "baik";
            
            const data = {
                hari,
                tanggal,
                tanggal_string,
                bulan,
                tahun: year,
                nama_pengurus,
                nama_peminjam,
                nip_pengurus,
                jabatan_pengurus,
                kecamatan,
                kecamatan_caps,
                kelurahan,
                kelurahan_caps,
                berkas,
                berkas_caps,
                kondisi,
            };

            const user = await refreshToken();

            if (user === null) {
                throw new Error("Token tidak valid");
            }

            const response = await fetch(`http://localhost:3000/api/berita-acara`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            window.open(url);
        });

    } catch(error) {
        console.log(error);

        createAlertMessage(error.message, true);

        window.location.reload
    }
}

async function confirmprintBA(idx, statusId) {
    try {
        let statusConfirm = '';

        if (statusId === 0) {
            statusConfirm = "Selesai";
        } else 
        if (statusId === 1) {
            statusConfirm = "Rusak";
        }
        else
        if (statusId === 2) {
            statusConfirm = "Hilang";
        } else {
            throw new Error("Status tidak valid");
        }

        const user = await refreshToken();

        const response = await fetch(`http://localhost:3000/api/loans/${tableLoans.getLoanByIdx(idx).getId()}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: statusConfirm,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (statusId === 0) {
            statusConfirm = "baik";
        }
        createAlertMessage(`File berhasil dikembalikan dalam keadaan ${(statusConfirm.toLowerCase())}!`, false);

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

window.tambahPengajuan = tambahPengajuan;
window.showHistory = showHistory;
window.removeBlurAction = removeBlurAction;

window.printBA = printBA;
window.confirmprintBA = confirmprintBA;
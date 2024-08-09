import TableLoans from './models/table-loans.js';
import refreshToken from './utils/refresh-token.js';
import { removeBlur } from './utils/blur-effect.js';
import TambahPengajuan from './controllers/pengajuan-controller.js';
import createAlertMessage from './utils/alert-message.js';

const pengguna = await refreshToken();

if (!pengguna) {
    createAlertMessage("Login terlebih dahulu!", true);

    window.location.href = '/login';
}

const tableLoans = await new TableLoans("pengajuan", pengguna.getIsAdmin());

await tableLoans.setListLoanFromAPI("?list=1");

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

async function acceptRequest(index) {
    const confirm = window.confirm("Apakah Anda yakin ingin menerima pengajuan ini?");

    if (!confirm) {
        return;
    }

    const pengguna = await refreshToken();

    const id = tableLoans.getLoanByIdx(index).getId();

    try {
        const response = await fetch(`http://localhost:3000/api/loans/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + pengguna.getAccessToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'Diterima'
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Refresh halaman
        createAlertMessage("Pengajuan berhasil diterima!", false);

        window.location.reload();
    } catch (error) {
        console.log(error);

        createAlertMessage(error.message, true);

        window.location.reload();   
    }
}

async function removeRequest(index) {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus pengajuan ini?");

    if (!confirm) {
        return;
    }

    const pengguna = await refreshToken();
    const id = tableLoans.getLoanByIdx(index).getId();

    try {
        const response = await fetch(`http://localhost:3000/api/loans/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + pengguna.getAccessToken(),
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Refresh halaman
        createAlertMessage("Pengajuan berhasil dihapus!", false);

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

window.acceptRequest = acceptRequest;
window.removeRequest = removeRequest;
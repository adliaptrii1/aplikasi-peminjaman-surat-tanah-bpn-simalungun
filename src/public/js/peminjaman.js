import TableLoans from './models/table-loans.js';
import refreshToken from './utils/refresh-token.js';
import { removeBlur } from './utils/blur-effect.js';
import TambahPengajuan from './controllers/pengajuan-controller.js';
import createAlertMessage from './utils/alert-message.js';

const user = await refreshToken();

if (!user) {
    createAlertMessage("Login terlebih dahulu!", true);

    window.location.href = '/login';
}

const tableLoans = await new TableLoans("peminjaman", user.getIsAdmin());

await tableLoans.setListLoanFromAPI("?list=2");

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

async function acceptFile(index) {
    const confirm = window.confirm("Apakah Anda yakin ingin menerima file ini?");

    if (!confirm) {
        return;
    }

    const user = await refreshToken();

    try {
        const response = await fetch(`http://localhost:3000/api/loans/${tableLoans.getLoanByIdx(index).getId()}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "Peminjaman",
            }),
        });

        if (!response.ok) {
            alert(user.getAccessToken());
            throw new Error(response.statusText);
        }

        createAlertMessage("File berhasil diterima!", false);
        
        window.location.reload();
    } catch (error) {
        console.log(error);

        createAlertMessage(error.message, true);

        window.location.reload(); 
    }
}

async function returnFile(idx) {
    const confirm = window.confirm("Apakah Anda yakin ingin mengembalikan file ini?");

    if (!confirm) {
        return;
    }

    const user = await refreshToken();

    try {
        const response = await fetch(`http://localhost:3000/api/loans/${tableLoans.getLoanByIdx(idx).getId()}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "Pengembalian",
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        createAlertMessage("File berhasil dikembalikan!", false);

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

window.acceptFile = acceptFile;
window.returnFile = returnFile;
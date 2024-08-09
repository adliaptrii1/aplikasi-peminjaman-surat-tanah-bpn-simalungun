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

const tableLoans = await new TableLoans("pengembalian", user.getIsAdmin());

await tableLoans.setListLoanFromAPI("?list=3");

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

async function collectFileBack(idx) {

    const overlayContent = `
        <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Konfirmasi Pengembalian</h3>
        <hr class="text-dark">
        <p class="text-dark fs-6">Apakah Anda yakin ingin mengkonfirmasi pengembalian ini?</p>
        <button type="button" class="btn btn-success" onclick="confirmCollectFileBack(${idx}, 0)">Ya</button>
        <button type="button" class="btn btn-danger" onclick="confirmCollectFileBack(${idx}, 1)">Rusak</button>
        <button type="button" class="btn btn-warning" onclick="confirmCollectFileBack(${idx}, 2)">Hilang</button>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
    </div>
    `;

    tableLoans.showAlertContent(overlayContent);
}

async function confirmCollectFileBack(idx, statusId) {
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

window.collectFileBack = collectFileBack;
window.confirmCollectFileBack = confirmCollectFileBack;
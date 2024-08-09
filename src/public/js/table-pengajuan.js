import TableLoans from './models/table-loans.js';
import refreshToken from './utils/refresh-token.js';
import { removeBlur } from './utils/blur-effect.js';

const user = await refreshToken();
const tableLoans = await new TableLoans("pengajuan", user.isAdmin);
console.log(user);
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

window.showHistory = showHistory;
window.removeBlurAction = removeBlurAction;
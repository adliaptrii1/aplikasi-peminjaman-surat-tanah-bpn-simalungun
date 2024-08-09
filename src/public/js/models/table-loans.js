import ListLoan from "./list-loan.js";
import { isAdministrator, isStaff, isUser } from "../utils/check-role.js";
import dateTimeToString, { dateTimeToDateString, dateTimeToTimeString } from "../utils/datetime-to-string.js";
import { applyBlur} from "../utils/blur-effect.js";

class TableLoans {
    /* Properties */
    _listLoan = new ListLoan();

    /* Constructor */
    constructor(typeDataLoans, role) {
        this._listLoan = new ListLoan();
        this._itemPerPage = 5;
        this._indexPage = 1;
        this._tbody = document.querySelector("tbody");
        this._pageUl = document.querySelector(".pagination");
        this._itemShow = document.querySelector("#itemperpage");
        this._tr = this._tbody.querySelectorAll("tr");
        this._overlay = document.getElementById('overlay-info');
        
        this._typeDataLoans = typeDataLoans; 
        this._role = role;
    }

    async setListLoanFromAPI(param) {
        await this._listLoan.setListLoanFromAPI(param);
    }


    /* Method Function Get and Set Attributes */
    getListLoan() {
        return this._listLoan.getListLoan();
    }

    setListLoan(listLoan) {
        this._listLoan = listLoan;
    }

    getLoanByIdx(idx) {
        return this._listLoan.getLoanByIdx(idx);
    }

    getItemPerPage() {
        return this._itemPerPage;
    }

    setItemPerPage(itemPerPage) {
        this._itemPerPage = itemPerPage;
    }

    getIndexPage() {
        return this._indexPage;
    }

    setIndexPage(indexPage) {
        this._indexPage = indexPage;
    }

    getTbody() {
        return this._tbody;
    }

    setTbody(tbody) {
        this._tbody = tbody;
    }

    getPageUl() {
        return this._pageUl;
    }

    setPageUl(pageUl) {
        this._pageUl = pageUl;
    }

    getItemShow() {
        return this._itemShow;
    }

    setItemShow(itemShow) {
        this._itemShow = itemShow;
    }

    getTr() {
        return this._tr;
    }

    setTr(tr) {
        this._tr = tr;
    }

    getOverlay() {
        return this._overlay;
    }

    setOverlay(overlay) {
        this._overlay = overlay;
    }

    getPageLink() {
        return this._pageLink;
    }

    setPageLink(pageLink) {
        this._pageLink = pageLink;
    }

    getLastPage() {
        return this._lastPage;
    }

    setLastPage(lastPage) {
        this._lastPage = lastPage;
    }

    getPageLi() {
        return this._pageLi;
    }

    deleteLoanByIdx(idx) {
        this._listLoan.deleteLoanByIndex(idx);
    }

    /* Method Function Get */
    getTableLoans() {
        console.log(this._typeDataLoans);
        const listLoan = this._listLoan.getListLoan();

        let tBody = "";

        listLoan.forEach((loan, index) => {
            let buttons = `<ul class="list-unstyled">
                <li>
                    <button type="button" class="btn btn-primary  my-1 mx-0 px-1 py-0 fs-6"   style="width : 90px;" onclick="showHistory(${index})">
                        <i class="fas fa-history me-1"></i> History
                    </button>
                </li>`
            ;

            if (this._typeDataLoans == "pengajuan" && loan.getStatus() === 'Pengajuan') {
                if (isStaff(this._role) || isAdministrator(this._role)) {
                    buttons += `<li>
                        <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 90px;" onclick="acceptRequest(${index})">
                            <i class="fas fa-check me-1"></i>Terima
                        </button>
                    </li>`;
                } else if (isUser(this._role)) {
                    buttons += `<li>
                        <button type="button" class="btn btn-danger my-1 mx-0 px-1 py-0" fs-6 style="width : 90px;" id="removeRequest(${index})">
                            <i class="fas fa-trash me-1 text-light"></i>Delete
                        </button>
                    </li>`;
                }
            } else 

            if (this._typeDataLoans == "peminjaman") {
                console.log("Peminjaman");
                if (loan.getStatus() === 'Diterima') {
                    buttons += `<li>
                        <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 110px;" onclick="acceptFile(${index})">
                            <i class="fas fa-check me-1"></i>Terima
                        </button>
                    </li>`;
                } else if (loan.getStatus() === 'Peminjaman') {
                    buttons += `<li>
                    <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 110px;" onclick="returnFile(${index})">
                        <i class="fas fa-check me-1"></i>Kembalikan
                    </button>
                </li>`;
                }
            }

            buttons += `</ul>`;

            tBody += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${loan.getKelurahan()}</td>
                    <td>${loan.getKecamatan()}</td>
                    <td>${loan.getFileNumber()}</td>
                    <td>${loan.getRightNumber()}</td>
                    <td>${loan.getRightsType()}</td>
                    <td>${loan.getFile()}</td>
                    <td>${loan.getService()}</td>
                    <td>${loan.getInformation()}</td>
                    <td>${dateTimeToString(loan.getUpdatedAt())}</td>
                    <td>${loan.getStatus()}</td>
                    <td>${loan.getNameUser()}</td>
                    <td>${buttons}</td>
                </tr>
            `;
        });

        return table;
    }

    getTableLoanByIndex(index) {
        const loan = this._listLoan.getLoanByIdx(index);

        let buttons = `
        <ul class="list-unstyled">
            <li>
                <button type="button" class="btn btn-primary  my-1 mx-0 px-1 py-0 fs-6"   style="width : 90px;" onclick="showHistory(${index})">
                    <i class="fas fa-history me-1"></i> History
                </button>
            </li>`;

        if (this._typeDataLoans == "pengajuan" && loan.getStatus() === 'Pengajuan') {
            if (isStaff(this._role) || isAdministrator(this._role)) {
                buttons += `<li>
                    <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 90px;" onclick="acceptRequest(${index})">
                        <i class="fas fa-check me-1"></i>Terima
                    </button>
                </li>`;
            } else if (isUser(this._role)) {
                buttons += `<li>
                    <button type="button" class="btn btn-danger my-1 mx-0 px-1 py-0" fs-6 style="width : 90px;" onclick="removeRequest(${index})">
                        <i class="fas fa-trash me-1 text-light"></i>Delete
                    </button>
                </li>`;
            }
        } else 

        if (this._typeDataLoans == "peminjaman") {
            console.log("Peminjaman");
            if (loan.getStatus() === 'Diterima') {
                buttons += `<li>
                    <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" style="width : 90px;" onclick="acceptFile(${index})">
                        <i class="fas fa-file me-1"></i>Confirm
                    </button>
                </li>`;
            } else if (loan.getStatus() === 'Peminjaman') {
                buttons += `<li>
                <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" style="width : 90px;" onclick="returnFile(${index})">
                    <i class="fas fa-check me-1"></i>Return
                </button>
            </li>`;
            }
        } else

        if (this._typeDataLoans == "pengembalian" && loan.getStatus() === 'Pengembalian' && (isStaff(this._role) || isAdministrator(this._role))) {
            buttons += `<li>
                <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" style="width : 90px;" onclick="collectFileBack(${index})">
                    <i class="fas fa-check me-1"></i>Confirm
                </button>
            </li>`;
        } else 
        if (this._typeDataLoans == "berita-acara") {
            buttons += `<li>
                <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" style="width : 90px;" onclick="printBA(${index})">
                    <i class="fas fa-print me-1"></i>Print BA
                </button>
            </li>`;
        }

        buttons += `</ul>`;

        let ret = `<tr>
                <td>${index + 1}</td>
                <td>${loan.getKelurahan()}</td>
                <td>${loan.getKecamatan()}</td>
                <td>${loan.getFileNumber()}</td>
                <td>${loan.getRightNumber()}</td>
                <td>${loan.getRightsType()}</td>
                <td>${loan.getFile()}</td>
                <td>${loan.getService()}</td>
                <td>${loan.getInformation()}</td>
                <td>${dateTimeToString(loan.getUpdatedAt())}</td>
                <td>${loan.getStatus()}</td>
                <td>${loan.getNameUser()}</td>
                <td>${buttons}</td>
            </tr>
        `;

        return ret;
    }

    getHistoryTable(index) {
        const history = JSON.parse(this._listLoan.getLoanByIdx(index).getHistory());

        let ret = `
            <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
                <h3 class="alert-heading">History</h3>
                <hr class="text-dark">

                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                            <th>Waktu</th>
                            <th>Dikonfirmasi Oleh</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        history.forEach((data, index) => {
            const date = new Date(data.date);
            const dateStr = dateTimeToDateString(date);
            const timeStr = dateTimeToTimeString(date);
            
            let confirmedBy = data.confirmed_by;
            if (confirmedBy === undefined) {
                confirmedBy = "-";
            }

            ret += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${data.status}</td>
                    <td>${dateStr}</td>
                    <td>${timeStr}</td>
                    <td>${confirmedBy}</td>
                </tr>
            `;
        });

        ret += `
                    </tbody>
                </table>
                <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlurAction()"></button>
            </div>
        `;

        return ret;
    }
    
    /* Method Function Set */
    sortTableLoans(sortBy, asc) {
        console.log("Sort Table Loans");

        console.log(`Sort By: ${sortBy}, Asc: ${asc}`);

        const column = parseInt(sortBy);

        if (column === 1) {
            this._listLoan.sortLoanByKelurahan(asc);
        } else if (column === 2) {
            this._listLoan.sortLoanByKecamatan(asc);
        } else if (column === 3) {
            this._listLoan.sortLoanByFileNumber(asc);
        } else if (column === 4) {
            this._listLoan.sortLoanByRightNumber(asc);
        } else if (column === 5) {
            this._listLoan.sortLoanByRightsType(asc);
        } else if (column === 6) {
            this._listLoan.sortLoanByFile(asc);
        } else if (column === 7) {
            this._listLoan.sortLoanByService(asc);
        } else if (column === 8) {
            this._listLoan.sortLoanByInformation(asc);
        } else if (column === 9) {
            this._listLoan.sortLoanByUpdatedAt(asc);
        } else if (column === 10) {
            this._listLoan.sortLoanByStatus(asc);
        } else if (column === 11) {
            this._listLoan.sortLoanByNameUser(asc);
        }

        // this.setUpTable();
    }

    /* Method */
    showAlertContent(content) {
        console.log("Show Alert Content");
        this._overlay.innerHTML = content;
        this._overlay.style.display = 'fixed';

        applyBlur();
    }


    showHistory(index) {

        this._overlay.innerHTML = this.getHistoryTable(index);
        this._overlay.style.display = 'fixed';

        applyBlur();
    }
    
    /* Page Controller */
    displayPage() {
        const listLoan = this._listLoan.getListLoan();
        const totalPage = Math.min(listLoan.length, this._itemPerPage);

        this._tbody.innerHTML = "";

        for (let i = 0; i < totalPage; i++) {
            const tr = document.createElement("tr");
            tr.innerHTML = this.getTableLoanByIndex(i);
            this._tbody.appendChild(tr);
        }

        const pageNum = this._pageUl.querySelectorAll(".list");
        pageNum.forEach(n => n.remove());
    }

    pageGenerator(getem) {
        const num_of_tr = this.getListLoan().length;

        if (num_of_tr <= getem) {
            this._pageUl.style.display = "none";

            return;
        }

        this._pageUl.style.display = "flex";
        const num_of_page = Math.ceil(num_of_tr / getem);

        for (let i = 1; i <= num_of_page; i++) {
            const li = document.createElement("li");
            li.className = 'list';

            const a = document.createElement("a");
            a.href = "#";
            a.innerText = i;
            a.setAttribute("data-page", i);

            li.appendChild(a);
            this._pageUl.insertBefore(li, this._pageUl.querySelector(".next"));
        }
    }

    pageMaker() {
        const start = (this._indexPage - 1) * this._itemPerPage;
        const end = start + this._itemPerPage;


        this._tbody.innerHTML = "";

        for (let i = start; i < end; i++) {
            if (i >= this._listLoan.getListLoan().length) {
                break;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = this.getTableLoanByIndex(i);
            this._tbody.appendChild(tr);
        }
        
        Array.from(this._pageLi).forEach((e) => {
            e.classList.remove("active");
        });

        this._pageLi[this._indexPage-1].classList.add("active");
    }

    // (pageLink, itemPerPage, lastPage, pageLi);
    pageRunner() {
        for (let i = 0; i < this._pageLink.length; i++) {
            this._pageLink[i].onclick = e => {
                const pageNum = e.target.getAttribute("data-page");
                const pageMover = e.target.getAttribute('id');
                console.log(`pageNum: ${pageNum}, pageMover: ${pageMover}`);
                if (pageNum != null) {
                    this._indexPage = pageNum;
                } else
                if (pageMover === "prev") {
                    this._indexPage--;

                    if (this._indexPage < 1) {
                        this._indexPage = 1;
                    }
                } else
                if (pageMover === "next") {
                    this._indexPage++;

                    if (this._indexPage > this._lastPage) {
                        this._indexPage = this._lastPage;
                    }
                }

                this.pageMaker();
            }
        }
    }

    getPagElement() {
        let pagLink = this._pageUl.querySelectorAll("a");
        let pagLi = this._pageUl.querySelectorAll(".list");
        let lastPage = pagLink.length-2;

        this.pageRunner(pagLink, this._itemPerPage, lastPage, pagLi);
    }

    giveTrPerPage() {
        this._itemPerPage = document.getElementById("itemperpage").value;

        this.setUpTable();
        // Ambil value 
    }

    searchKey(key) {
        let searchKey = key.toLowerCase();
        let listLoan = this.getListLoan();

        let i = 0;
        while (i < listLoan.length) {
            // console.log(`i: ${i}, listLoan.length: ${listLoan.length}`);
            let loan = listLoan[i];
            let kelurahan = loan.getKelurahan().toLowerCase();
            let kecamatan = loan.getKecamatan().toLowerCase();
            let fileNumber = loan.getFileNumber().toLowerCase();
            let rightNumber = loan.getRightNumber().toLowerCase();
            let rightsType = loan.getRightsType().toLowerCase();
            let file = loan.getFile().toLowerCase();
            let service = loan.getService().toLowerCase();
            let information = loan.getInformation().toLowerCase();
            let updatedAt = dateTimeToString(loan.getUpdatedAt()).toLowerCase();
            let status = loan.getStatus().toLowerCase();
            let nameUser = loan.getNameUser().toLowerCase();

            if (kelurahan.includes(searchKey) || kecamatan.includes(searchKey) || fileNumber.includes(searchKey) || rightNumber.includes(searchKey) || rightsType.includes(searchKey) || file.includes(searchKey) || service.includes(searchKey) || information.includes(searchKey) || updatedAt.includes(searchKey) || status.includes(searchKey) || nameUser.includes(searchKey)) {
                i++;
                continue;
            } 

            this.deleteLoanByIdx(i);
        }
    }

    setUpTable() {
        // console.log("Setup Table");
        // Cek apakah ada parameter query pada url
        const url = new URL(window.location.href);
        const search = url.searchParams.get('search');

        if (search) {
            this.searchKey(search);
        }

        this.displayPage();

        this._itemShow.addEventListener('change', this.giveTrPerPage.bind(this));
        this.pageGenerator(this._itemPerPage);

        this._pageLink = this._pageUl.querySelectorAll("a");
        this._lastPage = this._pageLink.length-2;

        if (this.getListLoan().length > this._itemPerPage) {
            this._pageLi = this._pageUl.querySelectorAll(".list");
            this._pageLi[0].classList.add("active");
        }
        
        

        this.pageRunner();
    }
}

export default TableLoans
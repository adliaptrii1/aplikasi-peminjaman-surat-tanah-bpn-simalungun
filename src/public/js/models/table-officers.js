import ListOfficer from "./list-officer.js";
import { applyBlur } from "../utils/blur-effect.js";

class TableOfficers {

    constructor() {
        this._listOfficer = new ListOfficer();
        this._table = document.getElementById('table-officers');
        this._itemPerPage = 5;
        this._indexPage = 1;
        this._tbody = document.querySelector("tbody");
        this._pageUl = document.querySelector(".pagination");
        this._itemShow = document.querySelector("#itemperpage");
        this._tr = this._tbody.querySelectorAll("tr");
        this._overlay = document.getElementById('overlay-info');
    }

    async setListOfficerFromAPI() {
        await this._listOfficer.setListOfficerFromAPI();
    }

    getListOfficer() {
        return this._listOfficer;
    }

    setListOfficer(ListOfficer) {
        this._listOfficer = ListOfficer;
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

    getTableOfficers() {
        const listOfficer = this.getListOfficer();

        listOfficer.forEach((officer, index) => {
            let buttons = `
            <ul class="list-unstyled">
                <li>
                    <button type="button" class="btn btn-primary" onclick="editOfficer(${index})">
                        <i class="fas fa-edit me-1"></i> Edit
                    </button>
                </li>
                <li>
                    <button type="button" class="btn btn-danger" onclick="deleteOfficer(${index})">
                        <i class="fas fa-trash me-1"></i> Delete
                    </button>
                </li>
            </ul>
            `;

            const tBody = `
                <tr>
                    <td>${officer.getName()}</td>
                    <td>${officer.getNip()}</td>
                    <td>${officer.getPosition()}</td>
                    <td>${officer.getGolongan()}</td>
                    <td>${buttons}</td>
                </tr>
            `;
        });

        return tBody;
    }

    getTableOfficersByIndex(index) {
        const officer = this.getListOfficer().getOfficerByIdx(index);
        let buttons = `
            <ul class="list-unstyled">
                <li>
                    <button type="button" class="btn btn-secondary my-1 mx-0 px-1 py-0 " style="width : 80px; height : 30px;" onclick="editOfficer(${index})">
                        <i class="fas fa-edit me-1 text-light"></i> Edit
                    </button>
                </li>
                <li>
                    <button type="button" class="btn btn-danger my-1 mx-0 px-1 py-0 " style="width : 80px; height : 30px;" onclick="deleteOfficer(${index})">
                        <i class="fas fa-trash me-1 text-light"></i> Delete
                    </button>
                </li>
            </ul>
        `;

        const ret = `
            <tr>
                <td>${index+1}</td>
                <td>${officer.getName()}</td>
                <td>${officer.getPosition()}</td>
                <td>${officer.getNip()}</td>
                <td>${officer.getGolongan()}</td>
                <td>${buttons}</td>
            </tr>
        `;

        return ret;
    }

    sortTableOfficers(sortBy, asc) {
        const column = parseInt(sortBy);

        switch (column) {
            case 1:
                this.getListOfficer().sortByName(asc);
                break;
            case 2:
                this.getListOfficer().sortByPosition(asc);
                break;
            case 3:
                this.getListOfficer().sortByNip(asc);
                break;
            case 4:
                this.getListOfficer().sortByGolongan(asc);
                break;
        }
    }

    /* Method */
    showAlertContent(content) {
        this._overlay.innerHTML = content;
        this._overlay.style.display = 'fixed';

        applyBlur();
    }

    displayPage() {
        const listOfficer = this.getListOfficer().getListOfficer();
        const totalPage = Math.min(listOfficer.length, this._itemPerPage);
        
        this._tbody.innerHTML = "";
        for (let i = 0; i < totalPage; i++) {
            const tr = document.createElement("tr");
            tr.innerHTML = this.getTableOfficersByIndex(i);
            this._tbody.appendChild(tr);
        }

        const pageNum = this._pageUl.querySelectorAll(".list");
        pageNum.forEach(n => n.remove());
    }

    pageGenerator(getem) {
        const num_of_tr = this.getListOfficer().getListOfficer().length;

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
            if (i >= this._listOfficer.getListOfficer().length) {
                break;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = this.getTableOfficersByIndex(i);
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

    deleteOfficerByIdx(idx) {
        this._listOfficer.deleteOfficerByIndex(idx);
    }

    searchKey(key) {
        let searchKey = key.toLowerCase();
        let listOfficer = this._listOfficer.getListOfficer();

        let i = 0;
        while (i < listOfficer.length) {
            let officer = listOfficer[i];
            let name = officer.getName().toLowerCase();
            let nip = (`${officer.getNip()}`);
            let position = officer.getPosition().toLowerCase();
            let golongan = "";

            if (officer.getGolongan() !== null)
                golongan = officer.getGolongan().toLowerCase();
            // console.log(`Name: ${name}, NIP: ${nip}, Position: ${position}, Golongan: ${golongan}`);

            if (name.includes(searchKey) || nip.includes(searchKey) || position.includes(searchKey) || golongan.includes(searchKey)) {
                i++;
                continue;
            }

            this.deleteOfficerByIdx(i);
        }
    }

    setUpTable() {
        // console.log("Setup Table");
        // Cek apakah ada parameter query pada url
        

        if (search) {
            this.searchKey(search);
        }

        this.displayPage();

        this._itemShow.addEventListener('change', this.giveTrPerPage.bind(this));
        this.pageGenerator(this._itemPerPage);

        this._pageLink = this._pageUl.querySelectorAll("a");
        this._lastPage = this._pageLink.length-2;

        if (this._listOfficer.getListOfficer().length > this._itemPerPage) {
            this._pageLi = this._pageUl.querySelectorAll(".list");
            this._pageLi[0].classList.add("active");
        }

        this.pageRunner();
    }

}

export default TableOfficers;
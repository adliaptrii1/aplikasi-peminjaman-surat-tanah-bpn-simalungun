import ListKecamatan from "./list-kecamatan.js";
import { applyBlur } from "../utils/blur-effect.js";

class TableKecamatan {

    constructor() {
        this._listKecamatan = new ListKecamatan();
        this._table = document.getElementById('table-kecamatan');
        this._itemPerPage = 5;
        this._indexPage = 1;
        this._tbody = document.querySelector("tbody");
        this._pageUl = document.querySelector(".pagination");
        this._itemShow = document.querySelector("#itemperpage");
        this._tr = this._tbody.querySelectorAll("tr");
        this._overlay = document.getElementById('overlay-info');
    }

    async setListKecamatanFromAPI() {
        await this._listKecamatan.setListKecamatanFromAPI();
    }

    getListKecamatan() {
        return this._listKecamatan;
    }

    setListKecamatan(ListKecamatan) {
        this._listKecamatan = ListKecamatan;
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

    getTableKecamatanByIndex(index) {
        const kecamatan = this.getListKecamatan().getKecamatanByIdx(index);
        let buttons = `
            <ul class="list-unstyled">
                <li>
                    <button type="button" class="btn btn-secondary my-1 mx-0 px-1 py-0 fs-6" style="width : 90px;" onclick="editKecamatan(${index})">
                        <i class="fas fa-edit me-1 text-light"></i> Edit
                    </button>
                </li>
                <li>
                    <button type="button" class="btn btn-danger my-1 mx-0 px-1 py-0 fs-6" style="width : 90px;" onclick="deleteKecamatan(${index})">
                        <i class="fas fa-trash me-1 text-light"></i> Delete
                    </button>
                </li>
            </ul>
        `;

        const ret = `
            <tr>
                <td>${index+1}</td>
                <td>${kecamatan.getName()}</td>
                <td>${buttons}</td>
            </tr>
        `;

        return ret;
    }

    sortTableKecamatan(asc) {

        this.getListKecamatan().sortByName(asc);
    }

    /* Method */
    showAlertContent(content) {
        this._overlay.innerHTML = content;
        this._overlay.style.display = 'fixed';

        applyBlur();
    }

    displayPage() {
        const listKecamatan = this.getListKecamatan().getListKecamatan();
        const totalPage = Math.min(listKecamatan.length, this._itemPerPage);
        
        this._tbody.innerHTML = "";
        for (let i = 0; i < totalPage; i++) {
            const tr = document.createElement("tr");
            tr.innerHTML = this.getTableKecamatanByIndex(i);
            this._tbody.appendChild(tr);
        }

        const pageNum = this._pageUl.querySelectorAll(".list");
        pageNum.forEach(n => n.remove());
    }

    pageGenerator(getem) {
        const num_of_tr = this.getListKecamatan().getListKecamatan().length;

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
            if (i >= this._listKecamatan.getListKecamatan().length) {
                break;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = this.getTableKecamatanByIndex(i);
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

    deleteKecamatanByIdx(idx) {
        this._listKecamatan.deleteKecamatanByIndex(idx);
    }

    searchKey(key) {
        let searchKey = key.toLowerCase();
        let listKecamatan = this._listKecamatan.getListKecamatan();

        let i = 0;
        while (i < listKecamatan.length) {
            let kecamatan = listKecamatan[i];
            let name = kecamatan.getName().toLowerCase();

            // console.log(`Name: ${name}, NIP: ${nip}, Position: ${position}, Golongan: ${golongan}`);

            if (name.includes(searchKey)) {
                i++;
                continue;
            }

            this.deleteKecamatanByIdx(i);
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

        if (this._listKecamatan.getListKecamatan().length > this._itemPerPage) {
            this._pageLi = this._pageUl.querySelectorAll(".list");
            this._pageLi[0].classList.add("active");
        }

        this.pageRunner();
    }

}

export default TableKecamatan;
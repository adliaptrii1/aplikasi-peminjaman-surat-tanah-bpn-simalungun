let tbody, pageUl, itemShow, tr, emptyBox, index, itemPerPage;
tbody = document.querySelector("tbody");
pageUl = document.querySelector(".pagination");
itemShow = document.querySelector("#itemperpage");

// isi table
async function writeTable() {
    const accessToken = await refreshToken();

    try {
        

        const response = await fetch('http://localhost:3000/api/loans?list=3', {
            method: 'GET',
            headers: {
                // Tambahkan authorization header
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const data = await response.json();


        for (let i = 0; i < data.length; i++) {
            let buttons = `<li>
                <button type="button" class="btn btn-primary  my-1 mx-0 px-1 py-0 fs-6"   style="width : 110px;" onclick="showHistory(${i})">
                    <i class="fas fa-history me-1"></i> History
                </button>
                
            </li>`;

            if (isAdmin && data[i].status === 'Pengembalian') {
                buttons += `<li>
                        <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 110px;" onclick="collectFileBack(${data[i].id})">
                            <i class="fas fa-check me-1"></i>Konfirmasi
                        </button>
                    </li>`;
            }

            // const tr = document.createElement("tr");
            // Tulis di dalam elemen tabel dengan id = "tbody-main"

            const tr = document.createElement('tr');

           // Ubah data[i].createdAt menjadi Date
           const date = new Date(data[i].createdAt);

           const padZero = (num) => (num < 10 ? '0' : '') + num;

           // Mendapatkan komponen tanggal dan waktu
           const day = padZero(date.getUTCDate());
           const month = padZero(date.getUTCMonth() + 1); // Bulan dimulai dari 0
           const year = date.getUTCFullYear().toString().slice(-2);
           const hours = padZero(date.getUTCHours());
           const minutes = padZero(date.getUTCMinutes());
           const seconds = padZero(date.getUTCSeconds());

           // Membentuk string dalam format DD/MM/YY hh:mm:ss
           const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

           const formatter = new Intl.DateTimeFormat('id-ID', { 
               weekday: 'long', 
               year: 'numeric', 
               month: 'long', 
               day: 'numeric', 
               hour: '2-digit', 
               minute: '2-digit', 
               second: '2-digit', 
               timeZoneName: 'short'
           });
           // const formattedDate = data[i].createdAt;
           tr.innerHTML = `
           <td>${i+1}</td>
           <td>${data[i].kelurahan}</td>
           <td>${data[i].kecamatan}</td>
           <td>${data[i].file_number}</td>
           <td>${data[i].right_number}</td>
           <td>${data[i].rights_type}</td>
           <td>${data[i].file}</td>
           <td>${data[i].service}</td>
           <td>${data[i].information}</td>
           <td>${formattedDate}</td>
           <td>${data[i].status}</td>
           <td>${data[i].user}</td>
            <td>
            <ul style="list-style-type : none; padding: 0;">
                ${buttons}
            </ul>
            </td>
            <td class="d-lg-none">${data[i].history}</td>
            `;
            tbody.appendChild(tr);
        }
        console.log("Clearrr1 ");

    } catch (error) {
        console.log(error);
    } finally {
        console.log("Clearrr");
    }
}

function showHistory(i) {
    console.log("Show History-", i);
    // Cari elemen dengan id "overlay"
    const overlay = document.getElementById('overlay-info');

    // Ambil data json dari baris ke-i
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const data_json = emptyBox[i].querySelectorAll('td')[13].textContent;

    // Ubah data json menjadi objek
    const data = JSON.parse(data_json);
    console.log(data);

    // tBodyData merupakan string HTML yang akan diisi ke dalam tbody
    const tBodyData = data.map((item, index) => {
        console.log(item);
        const date = new Date(item.date);
       
        const padZero = (num) => (num < 10 ? '0' : '') + num;

        // Mendapatkan komponen tanggal dan waktu
        const day = padZero(date.getUTCDate());

        const month = padZero(date.getUTCMonth() + 1); // Bulan dimulai dari 0

        const year = date.getUTCFullYear().toString().slice(-2);

        const hours = padZero(date.getUTCHours());

        const minutes = padZero(date.getUTCMinutes());

        const seconds = padZero(date.getUTCSeconds());

        console.log(item.date);
        // Membentuk string dalam format DD/MM/YY hh:mm:ss

        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `
        <tr>
            <td>${index + 1}</td>
            <td>${item.status}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
        </tr>`;

    });

    overlay.innerHTML = `
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
                </tr>
            </thead>
            <tbody>
                ${tBodyData.join('')}
            </tbody>
        </table>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlur()"></button>
    </div>
        `;

    // Masukkan
    overlay.style.display = 'fixed';
    console.log("Overlay");
    // Tambahkan kelas blur ke semua elemen
    applyBlur();
}

async function collectFileBack(id) {
    console.log("Accept Request-", id);
    // Berikan alert namun ada 4 pilihan, yaitu, "Ya", "Rusak", "Hilang", "Tidak"
    const overlay = document.getElementById('overlay-info');

    overlay.innerHTML = `
    <div class="alert alert-light alert-dismissible fade show bg-light text-white border-0" role="alert">
        <h3 class="alert-heading">Konfirmasi Pengembalian</h3>
        <hr class="text-dark">
        <p class="text-dark fs-6">Apakah Anda yakin ingin mengkonfirmasi pengembalian ini?</p>
        <button type="button" class="btn btn-success" onclick="confirmCollectFileBack(${id}, 0)">Ya</button>
        <button type="button" class="btn btn-success" onclick="confirmCollectFileBack(${id}, 1)">Rusak</button>
        <button type="button" class="btn btn-success" onclick="confirmCollectFileBack(${id}, 2)">Hilang</button>
        <button type="button position-fixed z-5" class="btn-close " data-bs-dismiss="alert" aria-label="Close" onclick="removeBlur()"></button>
    </div>
    `;

    overlay.style.display = 'fixed';

    // Tambahkan kelas blur ke semua elemen
    applyBlur();


    // if (!confirm) return;

    // const accessToken = await refreshToken();

    // try {
    //     const response = await fetch(`http://localhost:3000/api/loans/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': 'Bearer ' + accessToken,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             status: 'Diterima'
    //         })
    //     });

    //     if (!response.ok) {
    //         throw new Error(response.statusText);
    //     }

    //     // Berikan alert bahwa pengajuan berhasil diterima
    //     alert('Pengajuan berhasil diterima');

    //     // Refresh halaman
    //     document.cookie = "alertMessage=" + JSON.stringify({
    //         message: "Pengajuan berhasil diterima",
    //         isDanger: false
    //     }) + ";max-age=5";

    //     window.location.reload();


    // } catch (error) {
    //     console.log(error);

    //     document.cookie = "alertMessage=" + JSON.stringify({
    //         message: error.message,
    //         isDanger: true
    //     }) + ";max-age=5";

    //     window.location.reload();   
    // }
}

async function confirmCollectFileBack(id, statusId) {
    const accessToken = await refreshToken();

    try {
        let statusKonfirm = '';
        console.log("Confirm Collect File Back-", id, statusId);
        

        if (statusId === 0) {
            statusKonfirm  = 'Selesai';
        } else if (statusId === 1) {
            statusKonfirm  = 'Rusak';
        } else if (statusId === 2) {
            statusKonfirm  = 'Hilang';
        } else {
            throw new Error('Status tidak valid');
        }

        const responseToken = await fetch('http://localhost:3000/api/token');
        alert("Tahan");
        if (!responseToken.ok) {
            throw new Error('Refresh Token Gagal!');
        }

        const dataToken = await responseToken.json();
        const accessToken = dataToken.accessToken;

        const response = await fetch(`http://localhost:3000/api/loans/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status : statusKonfirm
            })
        });

        if (!response.ok) {
            throw new Error(response.body);
        }

        // Refresh halaman
        document.cookie = "alertMessage=" + JSON.stringify({
            message: "Berkas berhasil dikembalikan dalam keadaan " + statusKonfirm,
            isDanger: false
        }) + ";max-age=5";

        window.location.reload();


    } catch (error) {
        console.log(error.message);

        document.cookie = "alertMessage=" + JSON.stringify({
            message: error.message,
            isDanger: true
        }) + ";max-age=5";

        window.location.reload();
        
    }
}

function giveTrPerPage(){
    console.log("giveTrPerPage");
    itemPerPage = Number(this.value);
    console.log(`Number of item per page: ${itemPerPage}`);
    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);

    let pageLink = pageUl.querySelectorAll("a");
    let lastPage =  pageLink.length - 2;
    pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
    pageRunner(pageLink, itemPerPage, lastPage, pageLi);
}

function displayPage(limit){
    console.log("displayPage");
    console.log(emptyBox);
    tbody.innerHTML = '';
    // Periksa batas untuk memastikan kita tidak mencoba mengakses elemen di luar batas emptyBox
    const length = Math.min(limit, emptyBox.length);
    for(let i=0; i<length; i++){
        tbody.appendChild(emptyBox[i]);
    }
    const pageNum = pageUl.querySelectorAll('.list');
    pageNum.forEach(n => n.remove());
}


function pageGenerator(getem){
    const num_of_tr = emptyBox.length;
    if(num_of_tr <= getem){
        pageUl.style.display = 'none';
    }else{
        pageUl.style.display = 'flex';
        const num_Of_Page = Math.ceil(num_of_tr/getem);
        for(i=1; i<=num_Of_Page; i++){
            const li = document.createElement('li'); li.className = 'list';
            const a =document.createElement('a'); a.href = '#'; a.innerText = i;
            a.setAttribute('data-page', i);
            li.appendChild(a);
            pageUl.insertBefore(li,pageUl.querySelector('.next'));
        }

    }
    
}


function pageRunner(page, items, lastPage, active){
    for(button of page){
        button.onclick = e=>{
            const page_num = e.target.getAttribute('data-page');
            const page_mover = e.target.getAttribute('id');
            if(page_num != null){
                index = page_num;

            }else{
                if(page_mover === "next"){
  index++;
  if(index >= lastPage){
      index = lastPage;
  }
                }else{
  index--;
  if(index <= 1){
      index = 1;
  }
                }
            }
            pageMaker(index, items, active);
        }
    }
}

function getpagElement(val){
    let pagelink = pageUl.querySelectorAll("a");
    let lastpage =  pagelink.length - 2;
    let pageli = pageUl.querySelectorAll('.list');
    // pageli[0].classList.add("active");
    pageRunner(pagelink, val, lastpage, pageli);
}


function pageMaker(index, item_per_page, activePage){
    const start = item_per_page * index;
    const end  = start + item_per_page;
    const current_page =  emptyBox.slice((start - item_per_page), (end-item_per_page));
    tbody.innerHTML = "";
    for(let j=0; j<current_page.length; j++){
        let item = current_page[j];					
        tbody.appendChild(item);
    }
    Array.from(activePage).forEach((e)=>{e.classList.remove("active");});
    activePage[index-1].classList.add("active");
}

// search content 
search = document.getElementById("search");
search.onkeyup = e => {
    const text = e.target.value.toLowerCase();

    displayPage(emptyBox.length);

    for (let i = 1; i < tr.length; i++) {
        const tds = tr[i].querySelectorAll("td");
        let match = false;
        for (let j = 0; j < tds.length; j++) {
            if (tds[j].innerText.toLowerCase().indexOf(text) > -1) {
                match = true;
                break;
            }
        }
        if (match) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }

    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);

    let pageLink = pageUl.querySelectorAll("a");
    let lastPage =  pageLink.length - 2;
    pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
    pageRunner(pageLink, itemPerPage, lastPage, pageLi);
}

// document.getElementById('sort-by').addEventListener('change', sortTable);
// document.getElementById('sort-type').addEventListener('change', sortTable);

// function sortTable() {
//     const sortBy = document.getElementById('sort-by').value;
//     const sortType = document.getElementById('sort-type').value;
//     const rows = Array.from(tbody.querySelectorAll('tr'));

//     rows.sort((a, b) => {
//         const aVal = a.querySelector(`td:nth-child(${sortBy})`).textContent.trim();
//         const bVal = b.querySelector(`td:nth-child(${sortBy})`).textContent.trim();

//         if (sortType === 'asc') {
//             return aVal.localeCompare(bVal);
//         } else {
//             return bVal.localeCompare(aVal);
//         }
//     });

//     tbody.innerHTML = '';
//     rows.forEach(row => tbody.appendChild(row));
// }
function sortTable() {
    // Hapus semua baris dalam tbody


    const sortBy = document.getElementById('sort-by').value;
    const sortType = document.getElementById('sort-type').value;
    
    // Jika tidak ada pilihan yang valid, kembalikan fungsi
    if (!sortBy || !sortType) return;

    displayPage(emptyBox.length);
    // Dapatkan semua baris dalam tbody
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Tentukan indeks kolom berdasarkan pilihan `sortBy`
    const sortIndex = parseInt(sortBy);

    // Tentukan urutan pengurutan
    const ascending = sortType === '1';

    // Lakukan pengurutan   
    rows.sort((a, b) => {
        // Dapatkan teks dari dua sel yang akan dibandingkan
        const textA = a.querySelectorAll('td')[sortIndex].textContent.trim();
        const textB = b.querySelectorAll('td')[sortIndex].textContent.trim();

        // Jika yang di cek adalah kolom waktu, gunakan Date.parse untuk mengubahnya menjadi milidetik
        if (sortIndex === 9) {
            return ascending ? Date.parse(textA) - Date.parse(textB) : Date.parse(textB) - Date.parse(textA);
        }

        // Bandingkan teks sesuai dengan urutan pengurutan
        if (ascending) {
            return textA.localeCompare(textB);
        } else {
            return textB.localeCompare(textA);
        }
    });

    // Tulis ulang kolom ke-0 (nomor urut)
    rows.forEach((row, index) => {
        let buttons = `
            <ul style="list-style-type : none; padding: 0;">
            <li>
                <button type="button" class="btn btn-primary  my-1 mx-0 px-1 py-0 fs-6"   style="width : 90px;" onclick="showHistory(${index})">
                    <i class="fas fa-history me-1"></i> History
                </button>
                
            </li>`;
        if (isAdmin) {
            buttons += 
                `<li>
                    <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 90px;" onclick="acceptRequest(${row.querySelectorAll('td')[0].textContent})">
                        <i class="fas fa-check me-1"></i>Terima
                    </button>
                </li>`;
        }

        buttons += '</ul>';

        row.querySelectorAll('td')[12].innerHTML = buttons;

        row.querySelectorAll('td')[0].textContent = index + 1;
    });
    
    

    // Kosongkan tbody
    tbody.innerHTML = '';

    // Tambahkan kembali baris yang sudah diurutkan ke tbody
    rows.forEach(row => tbody.appendChild(row));

    // Perbarui emptyBox dan panggil kembali fungsi pagination
    emptyBox = Array.from(tbody.querySelectorAll('tr'));
    
    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);

    let pageLink = pageUl.querySelectorAll("a");
    let lastPage =  pageLink.length - 2;
    pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
    pageRunner(pageLink, itemPerPage, lastPage, pageLi);
}

// Event listeners untuk dropdown
document.getElementById('sort-by').addEventListener('change', sortTable);
document.getElementById('sort-type').addEventListener('change', sortTable);


async function main() {
    // Tunggu writeTable selesai
    await writeTable();

    tbody = document.querySelector("tbody");
    pageUl = document.querySelector(".pagination");
    itemShow = document.querySelector("#itemperpage");
    tr = tbody.querySelectorAll("tr");
    emptyBox = [];
    index = 1;
    itemPerPage = 25;

    for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}

    itemShow.onchange = giveTrPerPage;

    displayPage(itemPerPage);

    pageGenerator(itemPerPage);
    let pageLink = pageUl.querySelectorAll("a");
    let lastPage =  pageLink.length - 2;

     pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
    pageRunner(pageLink, itemPerPage, lastPage, pageLi);
}

main();


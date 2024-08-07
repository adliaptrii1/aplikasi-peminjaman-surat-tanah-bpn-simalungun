let tbody, pageUl, itemShow, tr, emptyBox, index, itemPerPage;
tbody = document.querySelector("tbody");
pageUl = document.querySelector(".pagination");
itemShow = document.querySelector("#itemperpage");

// isi table
async function writeTable() {
    const accessToken = await refreshToken();

    try {
        

        const response = await fetch('http://localhost:3000/api/users', {
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
                <button type="button" class="btn btn-primary  my-1 mx-0 px-1 py-0 fs-6"   style="width : 120px;" onclick="updateUser(${i})">
                    <i class="fas fa-pencil me-1"></i> Ubah Profil
                </button>
                
            </li>
            <li>
                <button type="button" class="btn btn-danger my-1 mx-0 px-1 py-0" fs-6 style="width : 120px;" onclick="deleteUser(${data[i].id})">
                    <i class="fas fa-check me-1"></i>Hapus
                </button>
            </li>`;
            

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

           if (data[i].isAdmin === 1 || data[i].isAdmin === true) {
                data[i].isAdmin = 'Staff';
            } else 
            if (data[i].isAdmin === false || data[i].isAdmin === 0) {
                data[i].isAdmin = 'Pengguna';
            } else 
            if (data[i].isAdmin === 2) {
                data[i].isAdmin = 'Admin';
            }
           // const formattedDate = data[i].createdAt;
           console.log(data[i]);
            // <th>Nama</th>
            // <th>Username</th>
            // <th>Email</th>
            // <th>No. Telepon</th>
            // <th>Password</th>
            // <th>Admin</th>
            // <th>Action</th>
           tr.innerHTML = `
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].email}</td>
            <td>${data[i].username}</td>
            <td>${data[i].phone_number}</td>
            <td>${data[i].isAdmin}</td>

            <td>
            <ul style="list-style-type : none; padding: 0;">
                ${buttons}
            </ul>
            </td>
            <td style="display : none;">${data[i].id}</td>
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
                <button type="button" class="btn btn-primary  my-1 mx-0 px-1 py-0 fs-6"   style="width : 90px;" onclick="updateUser(${index})">
                    <i class="fas fa-history me-1"></i> History
                </button>
                
            </li>`;
        if (isAdmin) {
            buttons += 
                `<li>
                    <button type="button" class="btn btn-success my-1 mx-0 px-1 py-0" fs-6 style="width : 90px;" onclick="deleteUser(${row.querySelectorAll('td')[0].textContent})">
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


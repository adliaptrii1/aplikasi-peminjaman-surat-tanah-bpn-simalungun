

var tbody = document.querySelector("tbody");
var pageUl = document.querySelector(".pagination");
var itemShow = document.querySelector("#itemperpage");
var tr = tbody.querySelectorAll("tr");
var emptyBox = [];
var index = 1;
var itemPerPage = 8;

// isi table
const writeTable = async() => {
    // const response = await fetch('http://localhost:3000/api/loans');
    // const data = await response.json();
    fetch('http://localhost:3000/api/loans').then(response => {
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        return response.json();
    }).then(data => {
        for(let i=0; i<data.length; i++){
            const tr = document.createElement("tr");
            // <th>No.</th>
            // <th>Kelurahan</th>
            // <th>Kecamatan</th>
            // <th>No. Berkas</th>
            // <th>No. Hak</th>
            // <th>Tipe Hak</th>
            // <th>Jenis</th>
            // <th>Pelayanan</th>
            // <th>Keterangan</th>
            // <th>Waktu</th>
            // <th>Status</th>
            // <th>User</th>
            // <th>History</th>
            tr.innerHTML = `
            <td>${data[i].id}</td>
            <td>${data[i].kelurahan}</td>
            <td>${data[i].kecamatan}</td>
            <td>${data[i].file_number}</td>
            <td>${data[i].right_number}</td>
            <td>${data[i].rights_type}</td>
            <td>${data[i].file}</td>
            <td>${data[i].service}</td>
            <td>${data[i].information}</td>
            <td>${data[i].createdAt}</td>
            <td>${data[i].status}</td>
            <td>${data[i].user}</td>
            <td>${data[i].history}</td>
            `;
            tbody.appendChild(tr);
        }
    }).catch(error => {
        console.log(error);
    })

}

writeTable();

for(let i=0; i<tr.length; i++){ emptyBox.push(tr[i]);}

itemShow.onchange = giveTrPerPage;
function giveTrPerPage(){
    itemPerPage = Number(this.value);
    // console.log(itemPerPage);
    displayPage(itemPerPage);
    pageGenerator(itemPerPage);
    getpagElement(itemPerPage);
    writeTable();
}

function displayPage(limit){
    tbody.innerHTML = '';
    for(let i=0; i<limit; i++){
        tbody.appendChild(emptyBox[i]);
    }
    const  pageNum = pageUl.querySelectorAll('.list');
    pageNum.forEach(n => n.remove());
    writeTable();
}
displayPage(itemPerPage);

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
        writeTable();
    }
    
}
pageGenerator(itemPerPage);
let pageLink = pageUl.querySelectorAll("a");
let lastPage =  pageLink.length - 2;

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
    writeTable();

}
var pageLi = pageUl.querySelectorAll('.list'); pageLi[0].classList.add("active");
pageRunner(pageLink, itemPerPage, lastPage, pageLi);

function getpagElement(val){
    let pagelink = pageUl.querySelectorAll("a");
    let lastpage =  pagelink.length - 2;
    let pageli = pageUl.querySelectorAll('.list');
    pageli[0].classList.add("active");
    pageRunner(pagelink, val, lastpage, pageli);
    writeTable();
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
    writeTable();
}

// search content 
var search = document.getElementById("search");
search.onkeyup = e=>{
    const text = e.target.value;
    for(let i=0; i<tr.length; i++){
        const matchText = tr[i].querySelectorAll("td")[2].innerText;
        if(matchText.toLowerCase().indexOf(text.toLowerCase()) > -1){
            tr[i].style.visibility = "visible";
        }else{
            tr[i].style.visibility= "collapse";
        }
    }
    writeTable();
}



function FillKecamatan() {
    fetch('http://localhost:3000/api/kecamatan')
    .then(response => {
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        return response.json();
    }).then(data => {
        for(let i=0; i<data.length; i++){
            const option = document.createElement("option");
            option.value = data[i].id;
            option.text = data[i].name;
            subdistrict.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    })
}

// Listen perubahan pada select kecamatan
subdistrict.onchange = FillKelurahan;
function FillKelurahan() {
    const id_kecamatan = subdistrict.value;
    fetch(`http://localhost:3000/api/kelurahan?id_kecamatan=${id_kecamatan}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        return response.json();
    }).then(data => {
        // Hapus semua option sebelumnya lalu tambahkan option baru
        while (ward.options.length > 0) {
            ward.options.remove(0);
        }

        for(let i=0; i<data.length; i++){
            const option = document.createElement("option");
            option.value = data[i].id;
            option.text = data[i].name;
            ward.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    })
}

function FillServices() {
    fetch('http://localhost:3000/api/services')
    .then(response => {
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        return response.json();
    }).then(data => {
        for(let i=0; i<data.length; i++){
            const option = document.createElement("option");
            option.value = data[i].id;
            option.text = data[i].service;
            service.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    })
}

function FillTipeHak() {
    fetch('http://localhost:3000/api/rights-type')
    .then(response => {
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        for(let i=0; i<data.length; i++){
            const option = document.createElement("option");
            option.value = data[i].id;
            option.text = data[i].name;
            rights_type.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    })
}


const addPengajuan = async(event) =>  {
    event.preventDefault();

    try {
        const id_kelurahan = ward.value;
        const file_number = document.getElementById('file_number').value;
        const right_number = document.getElementById('rights_number').value;
        const id_rights_type = document.getElementById('rights_type').value;
        const id_service = document.getElementById('service').value;
        const information = document.getElementById('information').value;

        let fileInput = "";
        if (document.getElementById('bt').checked) {
            fileInput = "Buku Tanah";
        } else
        if (document.getElementById('st').checked) {
            fileInput = "Surat Tanah";
        }
        if (document.getElementById('warkah').checked) {
            fileInput = "Warkah";
        }

        console.log(2);
        
        
        const data = {
            id_kelurahan,
            file_number,
            right_number,
            id_rights_type,
            file : fileInput,
            id_service,
            information
        }
        console.log(3);
        

        const response2 = await fetch('http://localhost:3000/api/token');
        if (!response2.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        const data2 = await response2.json();
        const accessToken = data2.accessToken;

        console.log(4);
        
        // alert("Refresh Token Done");
        const response = await fetch('http://localhost:3000/api/loans', {
            method: 'POST',
            headers: {
                // Tambahkan authorization header
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(5);
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.body}`);
        } else {
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Pengajuan berhasil ditambahkan",
                isDanger: false
            }) + ";max-age=5";

            window.location.href = '/pengajuan';

            
        }
    } catch (error) {
        document.cookie = "alertMessage=" + JSON.stringify({
            message: error.message,
            isDanger: true
        }) + ";max-age=5";

        console.log(error);

        // alert("Pengajuan gagal ditambahkan");
    }
}

document.getElementById('form-pengajuan').addEventListener('submit', addPengajuan);

FillKecamatan();
FillServices();
FillTipeHak();
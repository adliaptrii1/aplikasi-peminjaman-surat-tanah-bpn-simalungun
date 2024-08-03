const otakudes = 10;

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

 function addPengajuan() {
    const id_kelurahan = ward.value;
    const file_number = document.getElementById('file_number').value;
    const right_number = document.getElementById('rights_number').value;
    const id_rights_type = document.getElementById('rights_type').value;
    const id_service = document.getElementById('service').value;
    const information = document.getElementById('information').value

    // console.log(id_kelurahan);
    // console.log(file_number);
    // console.log(right_number);
    // console.log(id_rights_type);
    // console.log(id_service);
    // console.log(information);

    // Tunggu refreshToken higga selesai
    

    // Cek input checkbox
    if (document.getElementById('bt').checked) {
        sendAPIPengajuan("Buku Tanah");
    }
    if (document.getElementById('st').checked) {
        sendAPIPengajuan("Surat Tanah");
    }
    if (document.getElementById('warkah').checked) {
        sendAPIPengajuan("Warkah");
    }

    console.log(`Buku Tanah = ${document.getElementById('bt').checked}`);
    console.log(`Surat Tanah = ${document.getElementById('st').checked}`);
    console.log(`Warkah = ${document.getElementById('warkah').checked}`);    

    // Tambahkan cookies untuk alertMessage
    document.cookie = "alertMessage=" + JSON.stringify({
        message: "Pengajuan berhasil ditambahkan",
        isDanger: false
    }) + ";max-age=5";

    // alert("Pengajuan berhasil ditambahkan");
    window.location.href = '/pengajuan-tambah';

     function sendAPIPengajuan(file) {
        const data = {
            id_kelurahan,
            file_number,
            right_number,
            id_rights_type,
            file,
            id_service,
            information
        }
        // console.log();

        refreshToken();
        console.log("Refresh Token Done");

        fetch('http://localhost:3000/api/loans', {
            method: 'POST',
            headers: {
                // Tambahkan authorization header 
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        }
        ).then(data => {
            
    
            // Buat cookies untuk alertMessage
            document.cookie = "alertMessage=" + JSON.stringify({
                message: "Pengajuan berhasil ditambahkan",
                isDanger: false
            }) + ";max-age=5";
        }).catch(error => {
            // alert(error.message);
            // console.log(error);
            document.cookie = "alertMessage=" + JSON.stringify({
                message: error.message,
                isDanger: true
            }) + ";max-age=5";

            window.location.href = '/pengajuan-tambah';
        })


        // JSON
        // {
        //     "id_kelurahan": 1,
        //     "file_number": "123",
        //     "right_number": "123",
        //     "id_rights_type": 1,
        //     "file": "Surat Tanah",
        //     "id_service": 1,
        //     "information": "Informasi"
        // }
    }
}


FillKecamatan();
FillServices();
FillTipeHak();
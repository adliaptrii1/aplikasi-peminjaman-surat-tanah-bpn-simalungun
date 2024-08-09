import refreshToken from "../utils/refresh-token.js"
import createAlertMessage from "../utils/alert-message.js";

const TambahPengajuan = async () => {
    console.log('Tambah Pengajuan');
    const user = await refreshToken();
    console.log(user);
    console.log(user === undefined);

    if (user === undefined) {
        createAlertMessage('Anda harus login terlebih dahulu!', true);
        window.location.href = '/login';
        return;
    }

    window.location.href = '/pengajuan-tambah';
}

export default TambahPengajuan;
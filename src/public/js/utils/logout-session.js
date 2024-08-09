import createAlertMessage from "./alert-message.js";

const LogoutSession = async () => {
    // // API : http://localhost:3000/api/logout
    // fetch('http://localhost:3000/api/logout', {
    //     method: 'DELETE',
    // }).then((response) => {
    //     // Jika respone status tidak sama dengan 200, maka akan kedirect ke halaman utama
    //     if (!response.ok) {
    //         throw new Error('Logout Gagal!');
    //     }

    // }).catch((error) => {
    // }).finally(() => {
    //     window.location.href = '/'; // Redirect ke halaman utama
    // });
    
    try {
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Logout Gagal!');
        }

        createAlertMessage('Logout berhasil!', false);

        window.location.href = '/'; // Redirect ke halaman utama
    } catch (error) {
        createAlertMessage(error.message, true);

        window.location.href = '/'; // Redirect ke halaman utama
    }
}

export default LogoutSession;
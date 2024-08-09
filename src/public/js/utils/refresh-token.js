import Pengguna from '../models/pengguna.js';

const refreshToken = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/token');
        if (!response.ok) {
            throw new Error('Refresh Token Gagal!');
        }
        const data = await response.json();
        const accessToken = await data.accessToken;
        const decodedToken = await jwt_decode(accessToken);

        const ret = new Pengguna(0, decodedToken.name, decodedToken.username, decodedToken.email, decodedToken.isAdmin, accessToken);
        
        // console.log("Refresh Token Success");
        return ret;
    } catch (error) {
        console.log(error);

        return undefined;
    }
}

export default refreshToken;
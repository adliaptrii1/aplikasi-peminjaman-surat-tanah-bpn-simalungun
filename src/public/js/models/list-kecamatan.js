import Kecamatan from "./kecamatan.js";
import refreshToken from "../utils/refresh-token.js";

class ListKecamatan {
    constructor() {
        this._list_kecamatan = [];
    }

    async setListKecamatanFromAPI() {
        const user = await refreshToken();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:3000/api/kecamatan`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data = await response.json();

            data.forEach((kecamatan) => {
                const newKecamatan = new Kecamatan(kecamatan.id, kecamatan.name);
                this._list_kecamatan.push(newKecamatan);
            });

        } catch (error) {
            console.log(error);
        }
    }

    getListKecamatan() {
        return this._list_kecamatan;
    }

    getKecamatanByIdx(idx) {
        return this._list_kecamatan[idx];
    }

    setListKecamatan(kecamatan) {
        this._list_kecamatan = kecamatan;
    }

    sortByName(asc) {
        this._list_kecamatan.sort((a, b) => {
            if (asc) {
                return a.getName().localeCompare(b.getName());
            } else {
                return b.getName().localeCompare(a.getName());
            }
        });
    }

    deleteKecamatanByIndex(index) {
        this._list_kecamatan.splice(index, 1);
    }
}

export default ListKecamatan;
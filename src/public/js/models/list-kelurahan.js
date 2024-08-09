import Kelurahan from "./Kelurahan.js";
import refreshToken from "../utils/refresh-token.js";

class ListKelurahan {
    constructor() {
        this._list_kelurahan = [];
    }

    async setListKelurahanFromAPI(param = '') {
        const user = await refreshToken();
        console.log(user);

        this._list_kelurahan = [];

        try {
            const response = await fetch(`http://localhost:3000/api/kelurahan${param}`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data = await response.json();

            data.forEach((kelurahan) => {
                const newKelurahan = new Kelurahan(kelurahan.id, kelurahan.name, kelurahan.id_kecamatan);
                this._list_kelurahan.push(newKelurahan);
            });

        } catch (error) {
            console.log(error);
        }
    }

    getListKelurahan() {
        return this._list_kelurahan;
    }

    getKelurahanByIdx(idx) {
        return this._list_kelurahan[idx];
    }

    setListKelurahan(kelurahan) {
        this._list_kelurahan = kelurahan;
    }

    sortByName(asc) {
        this._list_kelurahan.sort((a, b) => {
            if (asc) {
                return a.getName().localeCompare(b.getName());
            } else {
                return b.getName().localeCompare(a.getName());
            }
        });
    }

    sortByIdKecamatan(asc) {
        this._list_kelurahan.sort((a, b) => {
            if (asc) {
                return a.getIdKecamatan().localeCompare(b.getIdKecamatan());
            } else {
                return b.getIdKecamatan().localeCompare(a.getIdKecamatan());
            }
        });
    }

    deleteKelurahanByIndex(index) {
        this._list_kelurahan.splice(index, 1);
    }
}

export default ListKelurahan;
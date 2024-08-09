import Officer from "./officer.js";
import refreshToken from "../utils/refresh-token.js";

class ListOfficer {
    constructor() {
        this._list_officer = [];
    }

    async setListOfficerFromAPI() {
        const user = await refreshToken();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:3000/api/officers`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data = await response.json();

            data.forEach((officer) => {
                const newOfficer = new Officer(officer.id, officer.name, officer.nip, officer.position, officer.golongan);
                this._list_officer.push(newOfficer);
            });

        } catch (error) {
            console.log(error);

            throw new Error(error);
        }
    }

    getListOfficer() {
        return this._list_officer;
    }

    getOfficerByIdx(idx) {
        return this._list_officer[idx];
    }

    setListOfficers(officers) {
        this._list_officer = officers;
    }

    sortByName(asc) {
        this._list_officer.sort((a, b) => {
            if (asc) {
                return a.getName().localeCompare(b.getName());
            } else {
                return b.getName().localeCompare(a.getName());
            }
        });
    }

    sortByNip(asc) {
        // Mengurutkan berdasarkan tipe integer
        this._list_officer.sort((a, b) => {
            if (asc) {
                return a.getNip() - b.getNip();
            } else {
                return b.getNip() - a.getNip();
            }
        });
    }

    sortByPosition(asc) {
        this._list_officer.sort((a, b) => {
            if (asc) {
                return a.getPosition().localeCompare(b.getPosition());
            } else {
                return b.getPosition().localeCompare(a.getPosition());
            }
        });
    }

    sortByGolongan(asc) {
        this._list_officer.sort((a, b) => {
            if (asc) {
                return a.getGolongan().localeCompare(b.getGolongan());
            } else {
                return b.getGolongan().localeCompare(a.getGolongan());
            }
        });
    }

    deleteOfficerByIndex(index) {
        this._list_officer.splice(index, 1);
    }
}

export default ListOfficer;
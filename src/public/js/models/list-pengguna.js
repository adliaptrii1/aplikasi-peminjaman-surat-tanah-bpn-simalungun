import Pengguna from "./pengguna.js";
import refreshToken from "../utils/refresh-token.js";

class ListPengguna {
    constructor() {
        this._list_pengguna = [];
    }

    async setListPenggunaFromAPI() {
        const user = await refreshToken();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:3000/api/users`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data = await response.json();
            console.log(data);
            data.forEach((pengguna) => {
                const newPengguna = new Pengguna(pengguna.id, pengguna.name, pengguna.username, pengguna.email, pengguna.isAdmin, "" ,pengguna.phone_number, pengguna.nik, pengguna.address);
                this._list_pengguna.push(newPengguna);
            });

        } catch (error) {
            console.log(error);

            throw new Error(error);
        }
    }

    getListPengguna() {
        return this._list_pengguna;
    }

    getPenggunaByIdx(idx) {
        return this._list_pengguna[idx];
    }

    setListPengguna(pengguna) {
        this._list_pengguna = pengguna;
    }

    sortByNama(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getNama().localeCompare(b.getNama());
            } else {
                return b.getNama().localeCompare(a.getNama());
            }
        });
    }

    sorByUsername(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getUsername().localeCompare(b.getUsername());
            } else {
                return b.getUsername().localeCompare(a.getUsername());
            }
        });
    }

    sortByEmail(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getEmail().localeCompare(b.getEmail());
            } else {
                return b.getEmail().localeCompare(a.getEmail());
            }
        });
    }

    sortByPhoneNumber(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getPhoneNumber().localeCompare(b.getPhoneNumber());
            } else {
                return b.getPhoneNumber().localeCompare(a.getPhoneNumber());
            }
        });
    }

    sortByAddress(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getAddress().localeCompare(b.getAddress());
            } else {
                return b.getAddress().localeCompare(a.getAddress());
            }
        });
    }

    sortByNIK(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getNIK().localeCompare(b.getNIK());
            } else {
                return b.getNIK().localeCompare(a.getNIK());
            }
        });
    }

    sortByRole(asc) {
        this._list_pengguna.sort((a, b) => {
            if (asc) {
                return a.getIsAdmin() - (b.getIsAdmin());
            } else {
                return b.getIsAdmin() - (a.getIsAdmin());
            }
        });
    }



    deletePenggunaByIndex(index) {
        this._list_pengguna.splice(index, 1);
    }
}

export default ListPengguna;
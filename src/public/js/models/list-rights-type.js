import RightsType from "./rights-type.js";
import refreshToken from "../utils/refresh-token.js";

class ListRightsType {
    constructor() {
        this._list_rightsType = [];
    }

    async setListRightsTypeFromAPI() {
        const user = await refreshToken();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:3000/api/rights-type`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data = await response.json();
            console.log(data); 

            data.forEach((rightsType) => {
                const newRightsType = new RightsType(rightsType.id, rightsType.name);
                this._list_rightsType.push(newRightsType);
            });

        } catch (error) {
            console.log(error);
        }
    }

    getListRightsType() {
        return this._list_rightsType;
    }

    getRightsTypeByIdx(idx) {
        return this._list_rightsType[idx];
    }

    setListRightsType(rightsType) {
        this._list_rightsType = rightsType;
    }

    sortByName(asc) {
        this._list_rightsType.sort((a, b) => {
            if (asc) {
                return a.getName().localeCompare(b.getName());
            } else {
                return b.getName().localeCompare(a.getName());
            }
        });
    }

    deleteRightsTypeByIndex(index) {
        this._list_rightsType.splice(index, 1);
    }
}

export default ListRightsType;
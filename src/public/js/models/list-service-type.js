import ServiceType from "./service-type.js";
import refreshToken from "../utils/refresh-token.js";

class ListServiceType {
    constructor() {
        this._list_serviceType = [];
    }

    async setListServiceTypeFromAPI() {
        const user = await refreshToken();
        console.log(user);

        try {
            const response = await fetch(`http://localhost:3000/api/services`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data = await response.json();

            data.forEach((serviceType) => {
                const newServiceType = new ServiceType(serviceType.id, serviceType.service);
                this._list_serviceType.push(newServiceType);
            });

        } catch (error) {
            console.log(error);
        }
    }

    getListServiceType() {
        return this._list_serviceType;
    }

    getServiceTypeByIdx(idx) {
        return this._list_serviceType[idx];
    }

    setListServiceType(serviceType) {
        this._list_serviceType = serviceType;
    }

    sortByName(asc) {
        this._list_serviceType.sort((a, b) => {
            if (asc) {
                return a.getName().localeCompare(b.getName());
            } else {
                return b.getName().localeCompare(a.getName());
            }
        });
    }

    deleteServiceTypeByIndex(index) {
        this._list_serviceType.splice(index, 1);
    }
}

export default ListServiceType;
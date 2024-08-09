import Loan from './loan.js';
import refreshToken from '../utils/refresh-token.js';

class ListLoan {
    /* Constructor */
    constructor() {
        this._list_loan = [];
    }

    /* Set data dengan memanggil API */
    async setListLoanFromAPI(param) {
        const user = await refreshToken();

        try {
            const response = await fetch(`http://localhost:3000/api/loans${param}`, {
                headers: {
                    Authorization: `Bearer ${user.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data!');
            }

            const data =await response.json();


            data.forEach((loan) => {
                const newLoan = new Loan(loan.id, loan.kelurahan, loan.id_kelurahan, loan.kecamatan, loan.rights_type, loan.id_rights_type, loan.service, loan.id_service, loan.name_user, loan.user, loan.id_user, loan.file_number, loan.right_number, loan.file, loan.information, loan.history, loan.createdAt, loan.updatedAt, loan.status);
                this._list_loan.push(newLoan);
            });

        } catch (error) {
            console.log(error);

            throw new Error(error);
        }
    }

    // Buat method getListLoan
    getListLoan() {
        return this._list_loan;
    }

    getLoanByIdx(idx) {
        return this._list_loan[idx];
    }

    // Buat method getLoanById
    getLoanById(id) {
        return this._list_loan.find((loan) => loan.getId() === id);
    }

    // Buat method addLoan
    addLoan(loan) {
        this._list_loan.push(loan);
    }

    // Buat method updateLoan
    updateLoan(loan) {
        const index = this._list_loan.findIndex((loan) => loan.getId() === loan.getId());
        this._list_loan[index] = loan;
    }

    // Buat method deleteLoan
    deleteLoan(id) {
        this._list_loan = this._list_loan.filter((loan) => loan.getId() !== id);
    }

    deleteLoanByIndex(index) {
        this._list_loan.splice(index, 1);
    }

    // Buat method filterLoanByStatus
    filterLoanByStatus(status) {
        return this._list_loan.filter((loan) => loan.getStatus() === status);
    }

    // Buat method filterLoanByUser
    filterLoanByUser(user) {
        return this._list_loan.filter((loan) => loan.getUser() === user);
    }

    /* Methode Penggurutan Pada List */

    // Buat method sortLoanByDate
    sortLoanByDate(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => Date.parse(a.getCreatedAt()) - Date.parse(b.getCreatedAt()));
        }
        else {
            return this._list_loan.sort((a, b) => Date.parse(b.getCreatedAt()) - Date.parse(a.getCreatedAt()));
        }
    }

    // Buat method sortLoanByUpdatedAt
    sortLoanByUpdatedAt(asc) {
        // console.log(`updatedAt : ${this._list_loan[0].getUpdatedAt()}`);

        if (asc) {
            return this._list_loan.sort((a, b) => Date.parse(a.getUpdatedAt()) - Date.parse(b.getUpdatedAt()));
        }
        else {
            return this._list_loan.sort((a, b) => Date.parse(b.getUpdatedAt()) - Date.parse(a.getUpdatedAt()));
        }
    }

    // Buat method sortLoanByStatus
    sortLoanByStatus(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getStatus() - b.getStatus());
        } else {
            return this._list_loan.sort((a, b) => b.getStatus() - a.getStatus());
        }
    }

    // Buat method sortLoanByUser
    sortLoanByNameUser(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getNameUser().localeCompare(b.getNameUser()));
        } else {
            return this._list_loan.sort((a, b) => b.getNameUser().localeCompare(a.getNameUser()));
        }
    }

    sortLoanByKelurahan(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getKelurahan().localeCompare(b.getKelurahan()));
        } else {
            console.log("menurun");
            return this._list_loan.sort((a, b) => b.getKelurahan().localeCompare(a.getKelurahan()));
        }
    }

    sortLoanByKecamatan(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getKecamatan().localeCompare(b.getKecamatan()));
        } else {
            return this._list_loan.sort((a, b) => b.getKecamatan().localeCompare(a.getKecamatan()));
        }
    }

    sortLoanByRightsType(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getRightsType().localeCompare(b.getRightsType()));
        } else {
            return this._list_loan.sort((a, b) => b.getRightsType().localeCompare(a.getRightsType()));
        }
    }

    sortLoanByService(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getService().localeCompare(b.getService()));
        } else {
            return this._list_loan.sort((a, b) => b.getService().localeCompare(a.getService()));
        }
    }

    sortLoanByFileNumber(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getFileNumber().localeCompare(b.getFileNumber()));
        } else {
            return this._list_loan.sort((a, b) => b.getFileNumber().localeCompare(a.getFileNumber()));
        }
    }

    sortLoanByRightNumber(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getRightNumber().localeCompare(b.getRightNumber()));
        } else {
            return this._list_loan.sort((a, b) => b.getRightNumber().localeCompare(a.getRightNumber()));
        }
    }

    sortLoanByFile(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getFile().localeCompare(b.getFile()));
        } else {
            return this._list_loan.sort((a, b) => b.getFile().localeCompare(a.getFile()));
        }
    }

    sortLoanByInformation(asc) {
        if (asc) {
            return this._list_loan.sort((a, b) => a.getInformation().localeCompare(b.getInformation()));
        } else {
            return this._list_loan.sort((a, b) => b.getInformation().localeCompare(a.getInformation()));
        }
    }
}

export default ListLoan;
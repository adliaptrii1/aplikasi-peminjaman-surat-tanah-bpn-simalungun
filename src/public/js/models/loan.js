// Attribute : 
const _id = Symbol('id');
const _kelurahan = Symbol('kelurahan');
const _id_kelurahan = Symbol('id_kelurahan');
const _kecamatan = Symbol('kecamatan');
const _rights_type = Symbol('rights_type');
const _id_rights_type = Symbol('id_rights_type');
const _service = Symbol('service');
const _id_service = Symbol('id_service');
const _name_user = Symbol('name_user');
const _user = Symbol('user');
const _id_user = Symbol('id_user');
const _file_number = Symbol('file_number');
const _right_number = Symbol('right_number');
const _file = Symbol('file');
const _information = Symbol('information');
const _history = Symbol('history');
const _createdAt = Symbol('createdAt');
const _updatedAt = Symbol('updatedAt');
const _status = Symbol('status');

class Loan {
    constructor(id, kelurahan, id_kelurahan, kecamatan, rights_type, id_rights_type, service, id_service, name_user, user, id_user, file_number, right_number, file, information, history, createdAt, updatedAt, status) {
        this[_id] = id;
        this[_kelurahan] = kelurahan;
        this[_id_kelurahan] = id_kelurahan;
        this[_kecamatan] = kecamatan;
        this[_rights_type] = rights_type;
        this[_id_rights_type] = id_rights_type;
        this[_service] = service;
        this[_id_service] = id_service;
        this[_name_user] = name_user;
        this[_user] = user;
        this[_id_user] = id_user;
        this[_file_number] = file_number;
        this[_right_number] = right_number;
        this[_file] = file;
        this[_information] = information;
        this[_history] = history;
        this[_createdAt] = createdAt;
        this[_updatedAt] = updatedAt;
        this[_status] = status;
    }

    getId() {
        return this[_id];
    }

    getKelurahan() {
        return this[_kelurahan];
    }

    getIdKelurahan() {
        return this[_id_kelurahan];
    }

    getKecamatan() {
        return this[_kecamatan];
    }

    getRightsType() {
        return this[_rights_type];
    }

    getIdRightsType() {
        return this[_id_rights_type];
    }

    getService() {
        return this[_service];
    }

    getIdService() {
        return this[_id_service];
    }

    getNameUser() {
        return this[_name_user];
    }

    getUser() {
        return this[_user];
    }

    getIdUser() {
        return this[_id_user];
    }

    getFileNumber() {
        return this[_file_number];
    }

    getRightNumber() {
        return this[_right_number];
    }

    getFile() {
        return this[_file];
    }

    getInformation() {
        return this[_information];
    }

    getHistory() {
        return this[_history];
    }

    getCreatedAt() {
        return this[_createdAt];
    }

    getUpdatedAt() {
        return this[_updatedAt];
    }

    getStatus() {
        return this[_status];
    }
}

export default Loan;
const _id = Symbol('id');
const _name = Symbol('name');
const _id_kecamatan = Symbol('id_kecamatan');

class Kelurahan {
    constructor(id, name, id_kecamatan) {
        this[_id] = id;
        this[_name] = name;
        this[_id_kecamatan] = id_kecamatan;
    }

    getId() {
        return this[_id];
    }

    getName() {
        return this[_name];
    }

    setName(name) {
        this[_name] = name;
    }

    getIdKecamatan() {
        return this[_id_kecamatan];
    }

    setIdKecamatan(id_kecamatan) {
        this[_id_kecamatan] = id_kecamatan;
    }
}

export default Kelurahan;
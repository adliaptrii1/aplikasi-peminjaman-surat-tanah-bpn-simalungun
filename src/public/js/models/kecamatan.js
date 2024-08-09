const _id = Symbol('id');
const _name = Symbol('name');

class Kecamatan {
    constructor(id, name) {
        this[_id] = id;
        this[_name] = name;
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
}

export default Kecamatan;
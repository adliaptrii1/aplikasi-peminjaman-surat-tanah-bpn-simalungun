const _id = Symbol('id');
const _name = Symbol('name');
const _nip = Symbol('nip');
const _position = Symbol('position');
const _golongan = Symbol('golongan');

class Officer {
    constructor(id, name, nip, position, golongan) {
        this[_id] = id;
        this[_name] = name;
        this[_nip] = nip;
        this[_position] = position;
        this[_golongan] = golongan;
    }

    getId() {
        return this[_id];
    }

    getName() {
        return this[_name];
    }

    getNip() {
        return this[_nip];
    }

    getPosition() {
        return this[_position];
    }

    getGolongan() {
        return this[_golongan];
    }

    setName(name) {
        this[_name] = name;
    }

    setNip(nip) {
        this[_nip] = nip;
    }

    setPosition(position) {
        this[_position] = position;
    }

    setGolongan(golongan) {
        this[_golongan] = golongan;
    }
}

export default Officer;
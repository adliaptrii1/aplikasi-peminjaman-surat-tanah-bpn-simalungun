// User.js
const _id = Symbol('id');
const _nama = Symbol('nama');
const _username = Symbol('username');
const _email = Symbol('email');
const _isAdmin = Symbol('isAdmin');
const _accessToken = Symbol('accessToken');
const _phone_number = Symbol('phone_number');
const _nik = Symbol('nik');
const _address = Symbol('address');

class Pengguna {
  constructor(id, nama, username, email, isAdmin = 0, accessToken, phone_number, nik, address) {
    this[_id] = id;
    this[_nama] = nama;
    this[_username] = username;
    this[_email] = email;
    this[_isAdmin] = isAdmin;
    this[_accessToken] = accessToken;
    this[_phone_number] = phone_number;
    this[_nik] = nik;
    this[_address] = address;
  }

  getId() {
    return this[_id];
  }

  // Getter untuk nama
  getNama() {
    return this[_nama];
  }

  // Setter untuk nama
  setNama(nama) {
    this[_nama] = nama;
  }

  // Getter untuk username
  getUsername() {
    return this[_username];
  }

  // Setter untuk username
  setUsername(username) {
    this[_username] = username;
  }

  // Getter untuk email
  getEmail() {
    return this[_email];
  }

  // Setter untuk email
  setEmail(email) {
    this[_email] = email;
  }

  // Getter untuk isAdmin
  getIsAdmin() {
    return this[_isAdmin];
  }

  // Setter untuk isAdmin
  setIsAdmin(isAdmin) {
    this[_isAdmin] = isAdmin;
  }

  getAccessToken() {
    return this[_accessToken];
  }

  setAccessToken(accessToken) {
    this[_accessToken] = accessToken;
  }

  getPhoneNumber() {
    return this[_phone_number];
  }

  setPhoneNumber(phone_number) {
    this[_phone_number] = phone_number
  }

  getNIK() {
    return this[_nik];
  }

  setNIK(nik) {
    this[_nik] = nik;
  }

  getAddress() {
    return this[_address];
  }

  setAddress(address) {
    this[_address] = address;
  }

}

export default Pengguna;
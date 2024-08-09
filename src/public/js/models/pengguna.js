// User.js
const _nama = Symbol('nama');
const _username = Symbol('username');
const _email = Symbol('email');
const _isAdmin = Symbol('isAdmin');
const _accessToken = Symbol('accessToken');

class User {
  constructor(nama, username, email, isAdmin = false, accessToken) {
    this[_nama] = nama;
    this[_username] = username;
    this[_email] = email;
    this[_isAdmin] = isAdmin;
    this[_accessToken] = accessToken;
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

  // Method untuk menampilkan informasi pengguna
  toString() {
    return `Nama: ${this.getNama()}, Username: ${this.getUsername()}, Email: ${this.getEmail()}, Is Admin: ${this.getIsAdmin()}`;
  }
}

export default User;
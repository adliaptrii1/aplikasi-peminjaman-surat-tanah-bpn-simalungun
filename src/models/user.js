// models/user.js
const db = require('../middleware/connection');

// Menggunakan callback-based approach untuk simplicity
const User = {
  create: (userData) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';
      db.query(query, userData, (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, ...userData });
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  },

  findByPk: (id) => {
    return User.findById(id);  // Alias untuk konsistensi
  },

  update: (id, userData) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET ? WHERE id = ?';
      db.query(query, [userData, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0 ? { id, ...userData } : null);
      });
    });
  },

  destroy: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }
};

module.exports = User;

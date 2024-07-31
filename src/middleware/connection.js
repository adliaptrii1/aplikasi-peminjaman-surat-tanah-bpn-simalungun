const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ewarkah_databases"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('MySQL Connected...');
});

module.exports = db;
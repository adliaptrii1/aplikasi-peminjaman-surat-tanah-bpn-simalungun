const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3000;
const userRoutes = require('./routes/user-routes');
const kecamatanRoutes = require('./routes/kecamatan-router');
const kelurahanRoutes = require('./routes/kelurahan-router');
const rightsTypeRoutes = require('./routes/rights-type-router');
const services = require('./routes/services-router'); 

// Tuliskan ke console variabel di env
const db = require('./config/database');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Built-in middleware
app.use(express.static('public'));

// Cek database apakah terkoneksi dengan baik
db.authenticate()
    .then(() => {
        console.log('Database connected...')
        // db.sync({ force: true });
    })
    .catch(err => console.log('Error: ' + err));

// API
app.use("/api", userRoutes);
app.use("/api", kecamatanRoutes);
app.use("/api", kelurahanRoutes);
app.use("/api", rightsTypeRoutes);
app.use("/api", services);


// View Engine
app.get('/', (req, res) => {
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Beranda',
    });
});

app.get('/login', (req,res) => {
    res.render('login', {
        layout : 'layouts/main-layout',
        title : 'Login',
    });
});

app.get('/register', (req,res) => {
    res.render('register', {
        layout : 'layouts/main-layout',
        title : 'Register',
    });
});

app.get('/pengajuan', (req, res) => {
    res.render('pengajuan', {
        layout : 'layouts/main-layout',
        title : 'Pengajuan',
    });
});

app.get('/peminjaman', (req, res) => {
    res.render('peminjaman', {
        layout : 'layouts/main-layout',
        title : 'Peminjaman',
    });
});


app.get('/contact', (req, res) => {
    res.send('This is contact page');
});

app.put('/password', (req, res) => {
    console.log(req.body);
    res.send('Data has been updated');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


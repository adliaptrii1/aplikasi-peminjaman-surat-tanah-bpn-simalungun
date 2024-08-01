const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const userRoutes = require('./routes/user-routes');

const db = require('./middleware/connection');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.json());

// Built-in middleware
app.use(express.static('public'));

// API
app.use("/api", userRoutes);

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


// app.use('/', (req, res) => {
//     res.send('test');
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


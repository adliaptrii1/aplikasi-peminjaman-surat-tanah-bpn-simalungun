const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const db = require('./middleware/connection');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.json());

// Built-in middleware
app.use(express.static('public'));

// API
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`username: ${username}, password: ${password}`);
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.log(err);
        }
        res.send(results);
    }
    );
});

// View Engine
app.get('/', (req, res) => {
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Index',
    });
});

app.get('/pengajuan', (req, res) => {
    res.render('pengajuan', {
        layout : 'layouts/main-layout',
        title : 'About',
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


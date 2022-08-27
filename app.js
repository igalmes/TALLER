require('dotenv').config();

const { response } = require('express');
const express = require('express');
const app = express();
const expressLayaout = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(expressLayaout);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index'));
app.use(require('./routes/productos'));
app.use(require('./routes/contacto'));

app.use((req, res, next) => {
    res.status(404).send('Not fine');
});

const port = process.env.PORT || 80;

// app.use(require('./router'));

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.listen(port, () => console.log(`http://localhost:${port}`));
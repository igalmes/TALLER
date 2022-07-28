require('dotenv').config();

const { response } = require('express');
const express = require('express');
const app = express();
const expressLayaout = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(expressLayaout);

app.use(express.static(__dirname +'/public'));

app.use(require('./router'));

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

const port = process.env.PORT || 80;

require('dotenv').config();

const { response } = require('express');
const express = require('express');
const app = express();
const expressLayaout = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(expressLayaout);

app.use(express.static(__dirname +'/public'));

app.use(require('./router'));

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

const port = process.env.PORT || 80;


app.listen(port, () => console.log(`http://localhost:${port}`));
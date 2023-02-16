require('dotenv').config();

const { response } = require('express');
const express = require('express');
const app = express();
const expressLayaout = require('express-ejs-layouts');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(expressLayaout);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
const session = require('express-session');

app.use(session({
    secret: 'hcd*u9#{SJdWxFus',
    resave: false,
    saveUninitialized: false


}));


// cuando vaya a la ruta del admin pasa por esta capa
const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    }


    //falta relacionar roles de admin y usuario
    next();
}


app.use(require('./routes/index'));
app.use(require('./routes/productos'));
app.use(require('./routes/contacto'));


//desp del middlework la capa se muestra asi
app.use('/admin', isLogin, require('./routes/admin/productos'));

app.use(require('./routes/auth'));

app.use((req, res, next) => {
    res.status(404).send('Not fine');
});

const port = process.env.PORT || 80;

// app.use(require('./router'));

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.listen(port, () => console.log(`http://localhost:${port}`));
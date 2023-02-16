// creamos ruta Registro
// en views auth le renderizamos la vista
// en app.js agregamos el require a la route
// elegimos nuevo layout

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//requerimos login con la db
const connection = require('../db');

router.get('/login', (req, res) => {
    res.render('auth/login', { layout: 'layout-auth' });
});
    //validación de password con db
router.post('/login', (req, res) => {
    connection.query('SELECT * FROM usuarios WHERE email = ?',[ req.body.email ], async (error, results) => {
        if (error) { throw error }
        
        if (results.length == 0 || !(await bcryptjs.compare(req.body.password, results[0].password))) {
            res.send('Mail y/o contraseñas son incorrectos');
        } else {
            req.session.user_id = results[0].id;
            req.session.user_email = results[0].email;

            res.redirect('/');
         
            
            //agregamos middlework en app.js
        }
    });
})

router.get('/registro', (req, res) => {
    res.render('auth/registro', { layout: 'layout-auth' });
});


//Instruccion para registro en base de datos con bcrypt
router.post('/registro', async (req, res) => {
    //encriptamos password con 8 saltos
    const hash = await bcryptjs.hash(req.body.password, 8);

    connection.query('INSERT INTO usuarios SET ?', { email: req.body.email, password: hash }, error => {
        if (error) {throw error}

        //registrado el usuario la vista cambia a:
        res.redirect('/');
    });
})

router.get('/logout', (req, res) => {
    req.session.destroy(() =>{
        res.redirect('/');

    });
});


module.exports = router;
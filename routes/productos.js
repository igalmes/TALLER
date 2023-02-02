// const express = require('express');
// const router = express.Router();

// const productos = require('../productos');

// router.get('/productos', (req, res) => {
//     res.render('productos/index', { productos: productos.all() });
// })

// router.get('/productos/:id', (req, res) => {
//     res.render('productos/show', { producto: productos.find(req.params.id) });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

// const productos = require('../productos');
const connection = require('../db')

router.get('/productos', (req, res) => {
    connection.query('SELECT * FROM producto', (error, results) => {
        if (error) { throw error }


        res.render('productos/index', { productos: results });
    });
})

router.get('/productos/create', (req, res) => {
    res.render('productos/create');

});

router.post('/productos/store',  (req, res) => {
    connection.query('INSERT INTO producto SET ?', { nombre: req.body.nombre, categoria_id: req.body.categoria_id }, (error, results) => {
    
    if (error) { throw error }

        // console.log(results);

        res.redirect('/productos');
    });

    
});

router.get('/productos/:id', (req, res) => {

    connection.query('SELECT * FROM producto WHERE id= ?',[ req.params.id ],(error, results) => {
        if (error) { throw error }

        res.render('productos/show', { producto: results[0] });

    });
    
});

module.exports = router;
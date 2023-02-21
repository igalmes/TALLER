const connection = require('../../db');
const sharp = require('sharp');
const fs = require('fs');

const Categoria = require('../../models/Categoria');

module.exports.index = (req, res) => {
    Categoria.findAll().then(categoria => res.render('admin/categorias/index', { categoria: categoria, layout: 'layout-admin' }));
    
    // 


    // connection.query('SELECT * FROM producto', (error, results) => {
    //     if (error) { throw error }


    //     res.render('admin/categorias/index', { productos: results, layout: 'layout-admin' });
    // });
}

module.exports.create =  (req, res) => {
    res.render('admin/productos/create');

}

module.exports.store =  (req, res) => {    
    // console.log(req.body, req.file);
    // sharp(req.file.buffer).resize(300).toFile('uploads/output.jpg');
    connection.query('INSERT INTO producto SET ?',
    { nombre: req.body.nombre, categoria_id: req.body.categoria }, 
    (error, results) => {
    
        if (error) { throw error }

        sharp(req.file.buffer).resize(300).toFile(`./public/uploads/producto_${results.insertId}.jpg`);
        
        res.redirect('/admin/productos');
    });

    
}

module.exports.show = (req, res) => {

    connection.query('SELECT * FROM producto WHERE id= ?',[ req.params.id ],(error, results) => {
        if (error) { throw error }

        res.render('admin/productos/show', { producto: results[0] });

    })
    
}

module.exports.edit = (req, res) => {
    
    connection.query('SELECT * FROM producto WHERE id= ?', [ req.params.id ],(error, results) => {
        if (error) { throw error }

        res.render('admin/productos/edit', { producto: results[0] });

    })
    
}

module.exports.update = (req, res) => {
    connection.query('UPDATE producto SET ? WHERE id = ?', [
        { nombre: req.body.nombre, categoria_id: req.body.categoria }, req.body.id
    ] , (error, results) => {
        if (error) { throw error }
        
        if (req.file) {
            fs.unlink(`./public/uploads/producto_${req.body.id}.jpg`, async error => {
                if (error) { console.log(error) }

                await sharp(req.file.buffer).resize(300).toFile(`./public/uploads/producto_${req.body.id}.jpg`);
            });


        } else {

        res.redirect('/admin/productos');
        }
    });

}

module.exports.delete = (req, res) => {
    connection.query('DELETE FROM producto WHERE id = ?', [ req.params.id ], error => {
        if (error) { throw error }

        res.redirect('/admin/productos')
    });
}


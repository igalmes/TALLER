const connection = require('./db');

module.exports.index = (req, res) => {
    connection.query('SELECT * FROM producto', (error, results) => {
        if (error) { throw error }


        res.render('productos/index', { productos: results });
    });
}

module.exports.create =  (req, res) => {
    res.render('productos/create');

}

module.exports.store =  (req, res) => {    
    connection.query('INSERT INTO producto SET ?',
    { nombre: req.body.nombre, categoria_id: req.body.categoria }, (error, results) => {
    if (error) { throw error }

        

        res.redirect('/productos');
    });

    
}

module.exports.show = (req, res) => {

    connection.query('SELECT * FROM producto WHERE id= ?',[ req.params.id ],(error, results) => {
        if (error) { throw error }

        res.render('productos/show', { producto: results[0] });

    })
    
}

module.exports.edit = (req, res) => {
    
    connection.query('SELECT * FROM producto WHERE id= ?', [ req.params.id ],(error, results) => {
        if (error) { throw error }

        res.render('productos/edit', { producto: results[0] });

    })
    
}

module.exports.update = (req, res) => {
    connection.query('UPDATE producto SET ? WHERE id = ?', [
        { nombre: req.body.nombre, categoria_id: req.body.categoria }, req.body.id
    ] , (error, results) => {
        if (error) { throw error }


        res.redirect('/productos')

    });

}


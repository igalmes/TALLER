const connection = require('../db');

module.exports.index = (req, res) => {
    connection.query('SELECT * FROM producto', (error, results) => {
        if (error) { throw error }


        res.render('productos/index', { productos: results });
    });
}

module.exports.show = (req, res) => {

    connection.query('SELECT * FROM producto WHERE id= ?',[ req.params.id ],(error, results) => {
        if (error) { throw error }

        res.render('productos/show', { producto: results[0] });

    })
    
}




const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

router.get('/contacto', (req, res) => {
    res.render('contacto/index', { values:{} });
}) //muestra el formulario

router.post('/contacto', [
    body('nombre', 'El nombre debe tener un mínimo de 3 caracteres').exists().isLength(3).escape(),
    body('email', 'Ingrese un correo electrónico válido').exists().isEmail().normalizeEmail(),
    body('mensaje','Por favor, escriba su mensaje.').exists().trim().notEmpty().escape(),
] , (req, res) => {
    const errors = validationResult(req);
    console.log(req.body, errors);

    if (errors.isEmpty()) {
        res.send('Su mensaje ha sido enviado');
    } else {
        res.render('contacto/index', { values: req.body, errors: errors.array() })
    }
})

module.exports = router;
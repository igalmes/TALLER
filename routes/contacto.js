const express = require('express');
const router = express.Router();

const { check, body, validationResult } = require('express-validator');

router.get('/contacto', (req, res) => {
    res.render('contacto/index', { values:{} });
})

router.post('/contacto', [
    // body('nombre', 'El nombre debe tener un mínimo de 3 caracteres').exists().isLength(3).escape(),
    check('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre tiene que tener mas de 3 caracteres'),
    body('email', 'Ingrese un correo electrónico válido').exists().isEmail().normalizeEmail(),
    body('mensaje','Por favor, escriba su mensaje.').exists().trim().notEmpty().escape(),
] , (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        res.send('Su mensaje ha sido enviado');
    } else {
        res.render('contacto/index', { values: req.body, errors: errors.array() })
    }
})

module.exports = router;
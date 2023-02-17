const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer'); // 'se requiere solo donde se utiliza'
const ejs = require('ejs');


const { check, body, validationResult } = require('express-validator');

router.get('/contacto', (req, res) => {
    res.render('contacto/index', { values:{} });
})

router.post('/contacto', [
    check('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre tiene que tener mas de 3 caracteres'),
    body('email', 'Ingrese un correo electrónico válido.').exists().isEmail().normalizeEmail(),
    body('mensaje','Por favor, escriba su mensaje.').exists().trim().notEmpty().escape()
] , (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const transporter = nodemailer.createTransport({
            host: 'stpm.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user:'a5862d1a172474',
                pass: '4c3f1c4bdbf4fb'
            }

        });

        ejs.renderFile(__dirname + '/../views/contacto/correo.ejs', { body: req.body }, (error, html) => {
            if (error) { throw error }

            const options = {
                from: req.body.email,
                to: 'x@x.com',
                subjet: 'Nodemailer',
                html: html
            }
    
            transporter.sendMail(options, (error, info) => {
                if (error) { throw error }
    
                console.log(info);
            })
    
        });
        

        res.send('Su mensaje ha sido enviado');
    } else {
        res.render('contacto/index', { values: req.body, errors: errors.array() })
    }
})

module.exports = router;
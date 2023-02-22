const express = require('express');
const router = express.Router();

const controller = require('../../controllers/api/categorias');

router.get('/categorias', controller.index);

router.post('/categorias', controller.store);

router.get('/categorias/:id', controller.show);

router.put('/categoria', controller.update);

//FIJAMOS ID como en edit para ver cual eliminamos
router.delete('/categorias/:id', controller.delete);


module.exports = router;
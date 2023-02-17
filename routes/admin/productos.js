const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });


const controller = require('../../controllers/admin/productos');

router.get('/productos', controller.index);

router.get('/productos/create', controller.create);
router.post('/productos/store', upload.single('imagenes[]'), controller.store);

router.get('/productos/:id', controller.show);

router.get('/productos/:id/edit', controller.edit);
router.put('/producto/update',upload.single('imagenes[]'), controller.update);


//FIJAMOS ID como en edit para ver cual eliminamos
router.delete('/productos/:id/delete', controller.delete);


module.exports = router;
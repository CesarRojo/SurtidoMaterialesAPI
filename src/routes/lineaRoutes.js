const express = require('express');
const lineController = require('../controllers/lineaController');

const router = express.Router();

//Routes
router.get('/', lineController.getAllLines);
router.get('/:id', lineController.getLineById);
router.post('/', lineController.createLine);
router.put('/:id', lineController.updateLine);
router.delete('/:id', lineController.deleteLine);

module.exports = router;
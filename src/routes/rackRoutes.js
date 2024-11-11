const express = require('express');
const rackController = require('../controllers/rackController')

const router = express.Router();

//Routes
router.get('/', rackController.getAllRack);
router.get('/:id', rackController.getRackById);
router.post('/', rackController.createRack);
router.put('/:id', rackController.updateRack);
router.delete('/:id', rackController.deleteRack);

module.exports = router;
const express = require('express');
const materialController = require('../controllers/materialController')

const router = express.Router();

//Routes
router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById);
router.post('/', materialController.createMaterial);
router.put('/:id', materialController.updateMaterial);
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
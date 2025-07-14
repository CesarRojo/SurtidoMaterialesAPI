const express = require('express');
const materialController = require('../controllers/materialController');
const multer = require('multer');

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

//Routes
router.get('/', materialController.getAllMaterials);
router.get('/ordered', materialController.getOrderedMaterials);
router.get('/floor', materialController.getMaterialByFloor);
router.get('/floor2', materialController.getMaterialByFloor2);
router.get('/:id', materialController.getMaterialById);
router.post('/', materialController.createMaterial);
router.post('/bulk-update', upload.single('file'), materialController.bulkUpdatesRack);
router.put('/:id', materialController.updateMaterial);
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
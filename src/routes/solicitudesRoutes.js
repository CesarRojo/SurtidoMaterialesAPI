const express = require('express');
const solicitudesController = require('../controllers/solicitudesController')

const router = express.Router();

//Routes
router.get('/', solicitudesController.getAllSolicitudes);
router.get('/fecha', solicitudesController.getAllSolicitudesByFecha);
router.get('/:id', solicitudesController.getSolicitudesById);
router.get('/area/:id', solicitudesController.getSolicitudesByIdLinea);
router.post('/', solicitudesController.createSolicitudes);
router.put('/:id', solicitudesController.updateSolicitudes);
router.delete('/:id', solicitudesController.deleteSolicitudes);

module.exports = router;
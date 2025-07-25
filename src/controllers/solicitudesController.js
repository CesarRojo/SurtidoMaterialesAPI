const solicitudesService = require('../services/solicitudesService');

//Get all solicitudes
const getAllSolicitudes = async (req, res) => {
    try{
        const solicitudes = await solicitudesService.getAllSolicitudes();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes>>' });
    }
};

//Get all solicitudes by fecha
const getAllSolicitudesByFecha = async (req, res) => {
    try {
        // Obtener el filtro de fecha de los parámetros de consulta
        // const fechaInicio = req.query.fechaInicio; 
        // const fechaFin = req.query.fechaFin; 
        // const fechaInicio = new Date(req.query.fechaInicio);  
        // const fechaFin = new Date(req.query.fechaFin);
        const solicitudes = await solicitudesService.getAllSolicitudesByFecha();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes by fecha>>' });
    }
};

//Get solicitudes by id
const getSolicitudesById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const solicitudes = await solicitudesService.getSolicitudesById(id); //Se usa la const parseada
        if (solicitudes) {
            res.json(solicitudes);
        }else{
            res.status(404).json({ error: '<<Solicitudes not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes by id>>' });
    }
};

//Get solicitudes by idLinea
const getSolicitudesByIdLinea = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Obtener el filtro de fecha de los parámetros de consulta
        // const fechaInicio = new Date(req.query.fechaInicio);  
        // const fechaFin = new Date(req.query.fechaFin);  
        const solicitudes = await solicitudesService.getSolicitudesByIdLinea(id);
        if (solicitudes) {
            res.json(solicitudes);
        }else{
            res.status(404).json({ error: '<<Solicitudes not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes by idLinea>>' })
    }
};

//Create solicitudes
const createSolicitudes = async (req, res) => {
    try {
        const solicitudes = solicitudesService.createSolicitudes(req.body); //Se usa req.body y NO req.params.body
        res.status(201).json(solicitudes);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create solicitudes>>' })
    }
}

//Update solicitudes
const updateSolicitudes = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedSolicitudes = await solicitudesService.updateSolicitudes(id, req.body);
        res.json(updatedSolicitudes);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update solicitudes>>' });
    }
}

//Delete solicitudes
const deleteSolicitudes = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedSolicitudes = await solicitudesService.deleteSolicitudes(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete solicitudes>>' });
    }
}

module.exports = {
    getAllSolicitudes,
    getAllSolicitudesByFecha,
    getSolicitudesById,
    getSolicitudesByIdLinea,
    createSolicitudes,
    updateSolicitudes,
    deleteSolicitudes,
};

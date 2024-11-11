const areaService = require('../services/areaService');

//Get all lines
const getAllAreas = async (req, res) => {
    try{
        const area = await areaService.getAllAreas();
        res.json(area);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch areas>>' });
    }
}

//Get line by id
const getAreaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const area = await areaService.getAreaById(id); //Se usa la const parseada
        if (area) {
            res.json(area);
        }else{
            res.status(404).json({ error: '<<Area not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch area>>' });
    }
};

//Create line
const createArea = async (req, res) => {
    try {
        const area = areaService.createArea(req.body); //Se usa req.body y NO req.params.body
        res.status(201).json(area);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create area>>' })
    }
}

//Update line
const updateArea = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedArea = await areaService.updateArea(id, req.body);
        res.json(updatedArea);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update area>>' });
    }
}

//Delete line
const deleteArea = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedArea = await areaService.deleteArea(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete area>>' });
    }
}

module.exports = {
    getAllAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
};
const rackService = require('../services/rackService');

//Get all rack
const getAllRack = async (req, res) => {
    try{
        const rack = await rackService.getAllRack();
        res.json(rack);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch rack>>' });
    }
}

//Get rack by id
const getRackById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const rack = await rackService.getRackById(id); //Se usa la const parseada
        if (rack) {
            res.json(rack);
        }else{
            res.status(404).json({ error: '<<Rack not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch rack>>' });
    }
};

//Create rack
const createRack = async (req, res) => {
    try {
        const rack = rackService.createRack(req.body); //Se usa req.body y NO req.params.body
        res.status(201).json(rack);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create rack>>' })
    }
}

//Update rack
const updateRack = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedRack = await rackService.updateRack(id, req.body);
        res.json(updatedRack);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update rack>>' });
    }
}

//Delete rack
const deleteRack = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedRack = await rackService.deleteRack(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete rack>>' });
    }
}

module.exports = {
    getAllRack,
    getRackById,
    createRack,
    updateRack,
    deleteRack,
};

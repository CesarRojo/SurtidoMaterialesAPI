const lineaService = require('../services/lineaService');

//Get all lines
const getAllLines = async (req, res) => {
    try{
        const lines = await lineaService.getAllLines();
        res.json(lines);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch lines>>' });
    }
}

//Get line by id
const getLineById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const line = await lineaService.getLineById(id); //Se usa la const parseada
        if (line) {
            res.json(line);
        }else{
            res.status(404).json({ error: '<<Line not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch line>>' });
    }
};

//Create line
const createLine = async (req, res) => {
    try {
        const line = lineaService.createLine(req.body); //Se usa req.body y NO req.params.body
        res.status(201).json(line);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create line>>' })
    }
}

//Update line
const updateLine = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedLine = await lineaService.updateLine(id, req.body);
        res.json(updatedLine);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update line>>' });
    }
}

//Delete line
const deleteLine = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedLine = await lineaService.deleteLine(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete line>>' });
    }
}

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine,
};
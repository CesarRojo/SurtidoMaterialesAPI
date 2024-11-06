const lineaService = require('../services/lineaService');

//Get all lines
const getAllLines = async (req, res) => {
    try{
        const lines = await lineaService.getAllLines();
        res.json(lines);
    } catch (error) {
        res.satus(500).json({ error: '<<Failed to fetch lines>>' });
    }
}

//Get line by id
const getLineById = async (req, res) => {
    try {
        const line = await lineaService.getLineById(req.params.id);
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
        const line = lineaService.createLine(req.body);
        res.status(201).json(line);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create line>>' })
    }
}

//Update line
const updateLine = async (req, res) => {
    try {
        const updatedLine = await lineaService.updateLine(req.params.id, req.params.body);
        res.json(updatedLine);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update line>>' });
    }
}

//Delete line
const deleteLine = async (req, res) => {
    try {
        const deletedLine = await lineaService.deleteLine(req.params.id);
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
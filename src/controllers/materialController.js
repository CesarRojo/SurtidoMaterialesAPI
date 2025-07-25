const materialService = require('../services/materialService');
const fs = require('fs');

//Get all materials
const getAllMaterials = async (req, res) => {
    try{
        const material = await materialService.getAllMaterials();
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch material>>' });
    }
}

const getOrderedMaterials = async (req, res) => {
    try {
        //SE USA req.params CUANDO EL VALOR VIENE EN LA URL, CUANDO VIENE POR PARAMS SE USA req.query
        const id = parseInt(req.query.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const material = await materialService.getOrderedMaterials(id); //Se usa la const parseada
        if (material) {
            res.json(material);
        }else{
            res.status(404).json({ error: '<<Material not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch ordered materials>>' });
    }
}

const getMaterialByFloor = async (req, res) => {
    try {
        //SE USA req.params CUANDO EL VALOR VIENE EN LA URL, CUANDO VIENE POR PARAMS SE USA req.query
        const floor = req.query.floor;
        const material = await materialService.getMaterialByFloor(floor); //Se usa la const parseada
        if (material) {
            res.json(material);
        }else{
            res.status(404).json({ error: '<<Material not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch materials by floor>>' });
    }
};

const getMaterialByFloor2 = async (req, res) => {
    try {
        const floor = req.query.floor;
        const numero = req.query.numero;
        const material = await materialService.getMaterialByFloor2(floor, numero);
        if (material) {
            res.json(material);
        } else {
            res.status(404).json({ error: '<<Material not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch materials by floor and numero>>' });
    }
};

//Get material by id
const getMaterialById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const material = await materialService.getMaterialById(id); //Se usa la const parseada
        if (material) {
            res.json(material);
        }else{
            res.status(404).json({ error: '<<Material not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch Material>>' });
    }
};

//Create material
const createMaterial = async (req, res) => {
    try {
        const material = materialService.createMaterial(req.body); //Se usa req.body y NO req.params.body
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create material>>' })
    }
}

//Update material
const updateMaterial = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedMaterial = await materialService.updateMaterial(id, req.body);
        res.json(updatedMaterial);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update material>>' });
    }
}

//Delete line
const deleteMaterial = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedMaterial = await materialService.deleteMaterial(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete material>>' });
    }
}

//Procesamiento de excel para actualizar la ubicacion de los materiales
const bulkUpdatesRack = async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await materialService.updateRacksFromExcel(filePath);

        fs.unlinkSync(filePath); //Borra el archivo temporal
        if (result.errores.length > 0) {
            return res.status(400).json({
                message: 'Se encontraron algunos errores',
                errores: result.errores,
            });
        }

        res.status(200).json({ message: 'Actualizacion exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getOrderedMaterials,
    getMaterialByFloor,
    getMaterialByFloor2,
    bulkUpdatesRack,
};

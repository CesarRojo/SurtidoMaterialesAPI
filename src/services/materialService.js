const prisma = require('../prisma/prismaClient');

//Get all lines
const getAllMaterials = async () => {
    return await prisma.material.findMany({ 
        include: {
            rack: true,
        }
    });
};

//Get line by id
const getMaterialById = async (id) => {
    return await prisma.material.findUnique({ where: { idMaterial: id } });
};

const getOrderedMaterials = async (id) => {
    return await prisma.material.findMany({
        where: {
            idLinea: id,
        },
        orderBy: {
            numero: 'asc',
        },
    });
};

const getMaterialByFloor = async (floor) => {
    return await prisma.material.findMany({
        where: {
            floor: floor,
        },
        orderBy: {
            numero: 'asc',
        },
    });
};

const getMaterialByFloor2 = async (floor, numero) => {
    const materials = await prisma.material.findMany({
        where: {
            floor: floor,
        },
    });

    return materials.find(material => material.numero == numero);
};

//Create line
const createMaterial = async (data) => {
    return await prisma.material.create({ data });
};

//Update line
const updateMaterial = async (id, data) => {
    return await prisma.material.update({ where: { idMaterial: id }, data });
};

//Delete line
const deleteMaterial = async (id) => {
    return await prisma.material.delete({ where: { idMaterial: id } });
};

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getOrderedMaterials,
    getMaterialByFloor,
    getMaterialByFloor2
};
const prisma = require('../prisma/prismaClient');

//Get all lines
const getAllMaterials = async () => {
    return await prisma.material.findMany();
};

//Get line by id
const getMaterialById = async (id) => {
    return await prisma.material.findUnique({ where: { idMaterial: id } });
};

//Create line
const createMaterial = async (data) => {
    return await prisma.material.create({ data });
};

//Update line
const updateMaterial = async (id, data) => {
    return await prisma.material.update({ where: { idMaterial: id }, data }); //Se utiliza idLinea porque asi es como está en el schema de prisma
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
};

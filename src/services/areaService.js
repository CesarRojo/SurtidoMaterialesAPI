const prisma = require('../prisma/prismaClient');

//Get all lines
const getAllAreas = async () => {
    return await prisma.area.findMany();
};

//Get line by id
const getAreaById = async (id) => {
    return await prisma.area.findUnique({ where: { idArea: id } });
};

//Create line
const createArea = async (data) => {
    return await prisma.area.create({ data });
};

//Update line
const updateArea = async (id, data) => {
    return await prisma.area.update({ where: { idArea: id }, data }); //Se utiliza idLinea porque asi es como está en el schema de prisma
};

//Delete line
const deleteArea = async (id) => {
    return await prisma.area.delete({ where: { idArea: id } });
};

module.exports = {
    getAllAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
};

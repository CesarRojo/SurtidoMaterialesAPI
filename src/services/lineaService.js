const prisma = require('../prisma/prismaClient');

//Get all lines
const getAllLines = async () => {
    return await prisma.linea.findMany();
};

//Get line by id
const getLineById = async (id) => {
    console.log('El idLinea buscado es: ', idLinea);
    return await prisma.linea.findUnique({ where: { idLinea: id } });
};

//Create line
const createLine = async (data) => {
    return await prisma.linea.create({ data });
};

//Update line
const updateLine = async (id, data) => {
    return await prisma.linea.update({ where: { id: id }, data });
};

//Delete line
const deleteLine = async (id) => {
    return await prisma.linea.delete({ where: { id: id } });
};

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine,
};

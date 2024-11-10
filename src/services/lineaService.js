const prisma = require('../prisma/prismaClient');

//Get all lines
const getAllLines = async () => {
    return await prisma.linea.findMany();
};

//Get line by id
const getLineById = async (id) => {
    return await prisma.linea.findUnique({ where: { idLinea: id } });
};

//Create line
const createLine = async (data) => {
    return await prisma.linea.create({ data });
};

//Update line
const updateLine = async (id, data) => {
    return await prisma.linea.update({ where: { idLinea: id }, data }); //Se utiliza idLinea porque asi es como está en el schema de prisma
};

//Delete line
const deleteLine = async (id) => {
    return await prisma.linea.delete({ where: { idLinea: id } });
};

module.exports = {
    getAllLines,
    getLineById,
    createLine,
    updateLine,
    deleteLine,
};

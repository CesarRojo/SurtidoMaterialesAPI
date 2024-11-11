const prisma = require('../prisma/prismaClient');

//Get all rack
const getAllRack = async () => {
    return await prisma.ubicacionRack.findMany();
};

//Get solicitudes by id
const getRackById = async (id) => {
    return await prisma.ubicacionRack.findUnique({ where: { idRack: id } });
};

//Create solicitudes
const createRack = async (data) => {
    return await prisma.ubicacionRack.create({ data });
};

//Update solicitudes
const updateRack = async (id, data) => {
    return await prisma.ubicacionRack.update({ where: { idRack: id }, data }); //Se utiliza idSolicitud porque asi es como está en el schema de prisma
};

//Delete solicitudes
const deleteRack = async (id) => {
    return await prisma.ubicacionRack.delete({ where: { idRack: id } });
};

module.exports = {
    getAllRack,
    getRackById,
    createRack,
    updateRack,
    deleteRack,
};

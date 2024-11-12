const prisma = require('../prisma/prismaClient');

//Get all solicitudes
const getAllSolicitudes = async () => {
    return await prisma.solicitudes.findMany({
        include: {
            area: true,
            linea: true,
            material: true,
        },
    });
};

//Get solicitudes by id
const getSolicitudesById = async (id) => {
    return await prisma.solicitudes.findUnique({ where: { idSolicitud: id } });
};

//Get solicitudes by idLinea
const getSolicitudesByIdLinea = async (id) => {
    return await prisma.solicitudes.findMany({ 
        where: { 
            linea: {
                IdentificadorLinea: id,
            }
        },
        include: {
            area: true,
            linea: true,
            material: true,
        },
     });
};

//Create solicitudes
const createSolicitudes = async (data) => {
    return await prisma.solicitudes.create({ data });
};

//Update solicitudes
const updateSolicitudes = async (id, data) => {
    return await prisma.solicitudes.update({ where: { idSolicitud: id }, data }); //Se utiliza idSolicitud porque asi es como está en el schema de prisma
};

//Delete solicitudes
const deleteSolicitudes = async (id) => {
    return await prisma.solicitudes.delete({ where: { idSolicitud: id } });
};

module.exports = {
    getAllSolicitudes,
    getSolicitudesById,
    getSolicitudesByIdLinea,
    createSolicitudes,
    updateSolicitudes,
    deleteSolicitudes,
};

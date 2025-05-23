const prisma = require('../prisma/prismaClient');

//Get all solicitudes
const getAllSolicitudes = async () => {
    return await prisma.solicitudes.findMany({
        include: {
            area: true,
            linea: true,
            material: { include: {
                rack: true,
            }},
        },
    });
};

//Get all solicitudes by fecha
const getAllSolicitudesByFecha = async (fechaFiltro) => {
    const startOfDay = new Date(fechaFiltro);
    const endOfDay = new Date(new Date(fechaFiltro).setDate(startOfDay.getDate() + 1));

    return await prisma.solicitudes.findMany({
        where: {
            fechaSolicitud: {
                gte: startOfDay, // Mayor o igual a la fecha proporcionada
                lt: endOfDay,    // Menor a la fecha siguiente
            },
        },
        include: {
            area: true,
            linea: true,
            material: { include: {
                rack: true,
            }},
        },
    });
};

//Get solicitudes by id
const getSolicitudesById = async (id) => {
    return await prisma.solicitudes.findUnique({ where: { idSolicitud: id } });
};

//Get solicitudes by idLinea
const getSolicitudesByIdLinea = async (id, fechaFiltro) => {
    const whereClause = {
        linea: {
            idLinea: id,
        },
    };

    // Si se proporciona un filtro de fecha, agregarlo a la cláusula where
    if (fechaFiltro) {
        const startOfDay = new Date(fechaFiltro);
        const endOfDay = new Date(new Date(fechaFiltro).setDate(startOfDay.getDate() + 1));

        whereClause.fechaSolicitud = {
            gte: startOfDay, // Mayor o igual a la fecha proporcionada
            lt: endOfDay,    // Menor a la fecha siguiente
        };
    }

    const solis = await prisma.solicitudes.findMany({
        where: whereClause,
        include: {
            area: true,
            linea: true,
            material: { include: {
                rack: true,
            }},
        },
    });

    return solis;
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
    getAllSolicitudesByFecha,
    getSolicitudesById,
    getSolicitudesByIdLinea,
    createSolicitudes,
    updateSolicitudes,
    deleteSolicitudes,
};

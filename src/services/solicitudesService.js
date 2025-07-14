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
const getAllSolicitudesByFecha = async () => {
    const result = await prisma.$queryRaw`SELECT GETDATE() AS ServerDateTime`;
    const serverDate = result[0].ServerDateTime;
    const [date, time] = serverDate.toISOString().split('T');
    const [año, mes, dia] = date.split('-');
    const [hourStr, minStr] = time.split(':');
    const hour = parseInt(hourStr);
    const min = parseInt(minStr);

    let fechaInicio, fechaFin;
    if (hour === 16 && min >= 0 && min < 30) {
      fechaInicio = `${año}-${mes}-${dia}T06:00:00.000Z`;
      fechaFin =`${año}-${mes}-${dia}T16:30:00.000Z`;
    } else if (hour >= 6 && hour < 16) {
      fechaInicio = `${año}-${mes}-${dia}T06:00:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T16:30:00.000Z`;
    } else if (hour >= 16 && min >= 31) {
      fechaInicio = `${año}-${mes}-${dia}T16:31:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T23:59:59.000Z`;
    } else if (hour >= 17) {
      fechaInicio = `${año}-${mes}-${dia}T16:31:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T23:59:59.000Z`;
    }else if(hour < 2){
      fechaFin = `${año}-${mes}-${dia}T02:00:00.000Z`; //Las 2am del dia actual
      // Obtener el día anterior correctamente
      const diaAnteriorDate = new Date(serverDate);
      diaAnteriorDate.setDate(diaAnteriorDate.getDate() - 1);
      const añoAnterior = diaAnteriorDate.getFullYear();
      const mesAnterior = String(diaAnteriorDate.getMonth() + 1).padStart(2, '0');
      const diaAnterior = String(diaAnteriorDate.getDate()).padStart(2, '0');
      fechaInicio = `${añoAnterior}-${mesAnterior}-${diaAnterior}T16:31:00.000Z`; //Las 16:31 del dia anterior
    } else {
      fechaInicio = `${año}-${mes}-${dia}T06:00:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T16:30:00.000Z`;
    }

    try {
        return await prisma.solicitudes.findMany({
            where: {
                fechaSolicitud: {
                    gte: fechaInicio, // Mayor o igual a la fecha proporcionada
                    lt: fechaFin,    // Menor a la fecha siguiente
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
    } catch (error) {
        console.error("<<Error al buscar las solicitudes>>",error);
    }
};

//Get solicitudes by id
const getSolicitudesById = async (id) => {
    return await prisma.solicitudes.findUnique({ where: { idSolicitud: id } });
};

//Get solicitudes by idLinea
const getSolicitudesByIdLinea = async (id) => {
    const result = await prisma.$queryRaw`SELECT GETDATE() AS ServerDateTime`;
    const serverDate = result[0].ServerDateTime;
    const [date, time] = serverDate.toISOString().split('T');
    const [año, mes, dia] = date.split('-');
    const [hourStr, minStr] = time.split(':');
    const hour = parseInt(hourStr);
    const min = parseInt(minStr);
    
    let fechaInicio, fechaFin;

    if (hour === 16 && min >= 0 && min < 30) {
      fechaInicio = `${año}-${mes}-${dia}T06:00:00.000Z`;
      fechaFin =`${año}-${mes}-${dia}T16:30:00.000Z`;
    } else if (hour >= 6 && hour < 16) {
      fechaInicio = `${año}-${mes}-${dia}T06:00:00.000Z`;
      fechaFin =`${año}-${mes}-${dia}T16:30:00.000Z`;
    } else if (hour >= 16 && min >= 31) {
      fechaInicio = `${año}-${mes}-${dia}T16:31:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T23:59:59.000Z`;
    } else if (hour >= 17) {
      fechaInicio = `${año}-${mes}-${dia}T16:31:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T23:59:59.000Z`;
    }else if(hour < 2){
      fechaFin = `${año}-${mes}-${dia}T02:00:00.000Z`; //Las 2am del dia actual
      // Obtener el día anterior correctamente
      const diaAnteriorDate = new Date(serverDate);
      diaAnteriorDate.setDate(diaAnteriorDate.getDate() - 1);
      const añoAnterior = diaAnteriorDate.getFullYear();
      const mesAnterior = String(diaAnteriorDate.getMonth() + 1).padStart(2, '0');
      const diaAnterior = String(diaAnteriorDate.getDate()).padStart(2, '0');
      fechaInicio = `${añoAnterior}-${mesAnterior}-${diaAnterior}T16:31:00.000Z`; //Las 16:31 del dia anterior
    } else {
      fechaInicio = `${año}-${mes}-${dia}T06:00:00.000Z`;
      fechaFin = `${año}-${mes}-${dia}T16:30:00.000Z`;
    }

    const whereClause = {
        linea: {
            idLinea: id,
        },
    };

    // Si se proporciona un filtro de fecha, agregarlo a la cláusula where
    if (fechaInicio && fechaFin) {
        const startOfDay = fechaInicio;
        const endOfDay = fechaFin;

        whereClause.fechaSolicitud = {
            gte: startOfDay, // Mayor o igual a la fecha proporcionada
            lt: endOfDay,    // Menor a la fecha siguiente
        };
    }

    try {
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
    } catch (error) {
        console.error("<<Error al buscar las solicitudes>>", error);
    }
};

//Create solicitudes
const createSolicitudes = async (data) => {
    const result = await prisma.$queryRaw`SELECT GETDATE() AS ServerDateTime`;
    const serverDate = result[0].ServerDateTime;
    const [hourStr, minStr] = serverDate.toISOString().split('T')[1].split(':');
    const hour = parseInt(hourStr);
    const min = parseInt(minStr);

    let Turno;
    if (hour === 16 && min >= 0 && min < 30) {
        Turno = 'A'; // Incluye hasta las 16:29
    } else if (hour >= 7 && hour < 16) {
        Turno = 'A'; // Desde las 7:00 AM hasta las 3:59 PM
    } else if (hour === 16 && min >= 31) {
        Turno = 'B'; // Desde las 4:31 PM (16:31) en adelante
    } else if (hour >= 17 || hour < 2) {
        Turno = 'B'; // Desde las 5:00 PM hasta la 1:30 AM
    } else {
        Turno = 'A'; // Cualquier otro caso (por si acaso)
    }

    const dataWithTurno = { ...data, Turno, fechaSolicitud: serverDate };
    return await prisma.solicitudes.create({ data: dataWithTurno });
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

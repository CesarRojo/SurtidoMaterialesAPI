const solicitudesService = require('../services/solicitudesService');
const prisma = require('../prisma/prismaClient');
const { getIO } = require('../socket');

//Get all solicitudes
const getAllSolicitudes = async (req, res) => {
    try{
        const solicitudes = await solicitudesService.getAllSolicitudes();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes>>' });
    }
};



//Get all solicitudes by fecha
const getAllSolicitudesByFecha = async (req, res) => {
    try {
        const solicitudes = await solicitudesService.getAllSolicitudesByFecha();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes by fecha>>' });
    }
};

//Get solicitudes by id
const getSolicitudesById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); //Se parsea a un int el req.params.id porque lo recibe como un string
        const solicitudes = await solicitudesService.getSolicitudesById(id); //Se usa la const parseada
        if (solicitudes) {
            res.json(solicitudes);
        }else{
            res.status(404).json({ error: '<<Solicitudes not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes by id>>' });
    }
};

//Get solicitudes by idLinea
const getSolicitudesByIdLinea = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const solicitudes = await solicitudesService.getSolicitudesByIdLinea(id);
        if (solicitudes) {
            res.json(solicitudes);
        }else{
            res.status(404).json({ error: '<<Solicitudes not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicitudes by idLinea>>' })
    }
};

//Create solicitudes
const createSolicitudes = async (req, res) => {
    try {
        const solicitudes = solicitudesService.createSolicitudes(req.body); //Se usa req.body y NO req.params.body
        res.status(201).json(solicitudes);

        const io = getIO();
        io.emit('solicitudes_actualizadas', { message: 'Nueva solicitud creada' });
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create solicitudes>>' })
    }
}

//Update solicitudes
const updateSolicitudes = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedSolicitudes = await solicitudesService.updateSolicitudes(id, req.body);
        res.json(updatedSolicitudes);

        const io = getIO();
        io.emit('solicitudes_actualizadas', { message: 'Nueva solicitud creada' });
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update solicitudes>>' });
    }
}

//Delete solicitudes
const deleteSolicitudes = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedSolicitudes = await solicitudesService.deleteSolicitudes(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete solicitudes>>' });
    }
}

const getSolicitudesFiltered = async (req, res) => {
  try {
    // Recibimos filtros y paginación por query params
    const {
      fechaInicio,
      fechaFin,
      turno,
      idLinea,
      numeroMaterial,
      nombreMaterial,
      page = 1,
      pageSize = 10,
    } = req.query;

    // Construimos el filtro dinámico
    const where = {
      AND: [],
    };

    if (fechaInicio) {
      where.AND.push({
        fechaSolicitud: {
          gte: new Date(fechaInicio),
        },
      });
    }

    if (fechaFin) {
      let fechaFin2 = new Date(fechaFin);
      fechaFin2.setUTCHours(23, 59, 59, 999);
      where.AND.push({
        fechaSolicitud: {
          lte: new Date(fechaFin2),
        },
      });
    }

    if (turno) {
      where.AND.push({
        Turno: turno,
      });
    }

    if (idLinea) {
      where.AND.push({
        idLinea: Number(idLinea),
      });
    }

    if (numeroMaterial || nombreMaterial) {
      where.AND.push({
        material: {
          ...(numeroMaterial && {
            numero: {
              contains: numeroMaterial,
            },
          }),
          ...(nombreMaterial && {
            nombre: {
              contains: nombreMaterial,
            },
          }),
        },
      });
    }

    // Contar total para paginación
    const total = await prisma.solicitudes.count({ where });

    // Obtener datos con paginación
    const solicitudes = await prisma.solicitudes.findMany({
      where,
      include: {
        area: true,
        linea: true,
        material: {
          include: {
            rack: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: Number(pageSize),
      orderBy: {
        fechaSolicitud: 'desc',
      },
    });

    res.json({
      data: solicitudes,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching filtered solicitudes' });
  }
};

module.exports = {
    getAllSolicitudes,
    getAllSolicitudesByFecha,
    getSolicitudesById,
    getSolicitudesByIdLinea,
    createSolicitudes,
    updateSolicitudes,
    deleteSolicitudes,
    getSolicitudesFiltered,
};

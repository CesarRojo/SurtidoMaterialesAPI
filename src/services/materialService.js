const prisma = require('../prisma/prismaClient');
const fs = require('fs');
const xlsx = require('xlsx');

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

//Procesamiento de excel para actualizar la ubicacion de los materiales
const updateRacksFromExcel = async (filePath) => {
    const errores = [];

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(sheet); //Convertir la hoja a JSON

        // Validar encabezados
        if (
            data.length === 0 ||
            !Object.prototype.hasOwnProperty.call(data[0], 'nombre') ||
            !Object.prototype.hasOwnProperty.call(data[0], 'nombreRack')
        ) {
            errores.push('El archivo Excel no contiene los encabezados requeridos: "nombre" y "nombreRack".');
            return { errores };
        }

        for (const row of data) {
            const nombreMaterial = row.nombre?.trim();
            const nombreRack = row.nombreRack?.trim();

            if(!nombreMaterial) {
                errores.push(`Fila incompleta: ${JSON.stringify(row)}`);
                continue;
            }

            let idRack = null;
            if (nombreRack) {
                const rack = await prisma.ubicacionRack.findFirst({
                    where: { nombre: nombreRack }
                });

                if(!rack) {
                    errores.push(`Rack no encontrado: ${nombreRack}`);
                    continue;
                }
                idRack = rack.idRack;
            }

            const updated = await prisma.material.updateMany({
                where: { nombre: nombreMaterial },
                data: { idRack: idRack }
            });

            if (updated.count === 0) {
                errores.push(`Material no encontrado: ${nombreMaterial}`);
            }
        }

        return { errores };
    } catch (error) {
        console.error(error);
        throw new Error('Error procesando el archivo Excel');
    }
}

module.exports = {
    getAllMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getOrderedMaterials,
    getMaterialByFloor,
    getMaterialByFloor2,
    updateRacksFromExcel,
};
const express = require('express');
const linesRoutes = require('./routes/lineaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse JSON
app.use(express.json());

//Register routes
app.use('/lines', linesRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});
















/*const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.linea.create({
    data: {
        nombre: 'FLOOR 22',
        materialista: 'Julian',
        fecha: new Date()
    }
  })

  const lineaUpd = await prisma.linea.update({
    where: {idLinea: 6},
    data: {nombre: 'Ernesto'}
  })
  console.log(lineaUpd)

  const allLines = await prisma.linea.findMany()
  console.log(allLines)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
*/
//Importaciones de express y CORS
const express = require('express');
const cors = require('cors');

//Importaciones de las rutas de cada API
const linesRoutes = require('./routes/lineaRoutes');
const areaRoutes = require('./routes/areaRoutes');
const materialRoutes = require('./routes/materialRoutes');
const solicitudesRoutes = require('./routes/solicitudesRoutes');
const rackRoutes = require('./routes/rackRoutes');

//Usando express y el puerto en el que se ejecutará la API.
//Por defecto selecciona el puerto que se tenga en el .env
//Si no hay uno se usa el 3000.
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//Middleware to parse JSON
app.use(express.json());

//Register routes
app.use('/lines', linesRoutes);
app.use('/areas', areaRoutes);
app.use('/material', materialRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/rack', rackRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});

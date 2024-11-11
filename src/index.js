const express = require('express');
const cors = require('cors');

const linesRoutes = require('./routes/lineaRoutes');
const areaRoutes = require('./routes/areaRoutes');
const materialRoutes = require('./routes/materialRoutes');
const solicitudesRoutes = require('./routes/solicitudesRoutes');
const rackRoutes = require('./routes/rackRoutes');
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

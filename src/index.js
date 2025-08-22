const express = require('express');
const cors = require('cors');
const http = require('http');

const linesRoutes = require('./routes/lineaRoutes');
const areaRoutes = require('./routes/areaRoutes');
const materialRoutes = require('./routes/materialRoutes');
const solicitudesRoutes = require('./routes/solicitudesRoutes');
const rackRoutes = require('./routes/rackRoutes');

const { initSocket } = require('./socket');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/lines', linesRoutes);
app.use('/areas', areaRoutes);
app.use('/material', materialRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/rack', rackRoutes);

const server = http.createServer(app);

// Inicializar socket.io
const io = initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
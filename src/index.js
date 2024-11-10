const express = require('express');
const cors = require('cors');

const linesRoutes = require('./routes/lineaRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//Middleware to parse JSON
app.use(express.json());

//Register routes
app.use('/lines', linesRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});
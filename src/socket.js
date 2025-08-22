const { Server } = require('socket.io');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', // Ajusta según tu frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.handshake.address);

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.handshake.address);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io no ha sido inicializado!');
  }
  return io;
}

module.exports = { initSocket, getIO };
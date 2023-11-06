import { createServer } from 'http';
import express from 'express';
import { Server } from "socket.io";

require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: '/chat/',
  cors: {
    origin: process.env.CORS_ORIGIN ,
  },
});

const getTime = () => {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const time = hour + ':' + minutes;
  return time;
}

io.on("connection", (socket) => {

  socket.on('disconnect', () => {
    const time = getTime()

    if (!!socket.data.name) {
      socket.broadcast.emit('info', {
        type: 'info',
        message: `${socket.data.name} saiu - ${time}`,
      });
    }
  });

  socket.on('set_name', name => {
    socket.data.name = name;
    const time = getTime()

    socket.broadcast.emit('info', {
      type: 'info',
      message: `${socket.data.name} entrou - ${time}`,
    });
  });

  socket.on('send_message', message => {
    const time = getTime()

    io.emit('message', {
      type: 'message',
      name: socket.data.name,
      message,
      hour: time,
      userId: socket.id,
    });
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Rodando suave na porta ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send("Aopa!");
});

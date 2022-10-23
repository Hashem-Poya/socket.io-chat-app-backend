const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(`${socket.id} user connected.`);

  setInterval(() => {
    socket.emit('msg', { data: [1, 2, 3] });
  }, 5000);

  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected.`);
  });
});

const PORT = 3000;
http.listen(PORT);

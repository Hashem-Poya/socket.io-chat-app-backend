const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, { cors: { origin: '*' } });

let users = [];

io.on('connection', (socket) => {
  console.log(`${socket.id} user connected.`);

  socket.on('newUser', (user) => {
    users.push(user);
    io.emit('newUserResponse', users);
  });

  socket.on('userTyping', (username) => {
    io.broadcast.emit('userTypingResponse', username);
  });

  socket.on('message', (data) => {
    io.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected.`);
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit('newUserResponse', users);
  });
});

const PORT = 3000;
http.listen(PORT);

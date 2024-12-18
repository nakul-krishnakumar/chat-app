const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

// Socket.io
io.on('connection', (socket) => {
   socket.on('user-message', (message) => {
      const output = `${socket.id} send ${message}`;
      console.log(output);
      io.emit('message', output);
   })
})

app.get('/', (req, res) => {
   res.sendFile('/public/index.html');
})

server.listen(9000, () => {
   console.log(`Server listening at PORT: 9000`);
});
const express = require('express')
const app = express()
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const port = process.env.PORT || 3001;
const io = new Server(server);
app.use(cors());
app.use(express.json())

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('setDir', (data) => { //recebe o caminho do app e seta no client
    socket.broadcast.emit('path', data)
    console.log('app set path to:', data);
  });
  socket.on('dir', (data) => { //recebe a resposta do client e manda pro app
    socket.broadcast.emit('getDir', data)
  });

});

app.get('/getpath', (req, res) => {
  io.sockets.emit('path', { path: req.query.path })
  res.send('Emited')
})

app.post('/setpath', (req, res) => {
  console.log(req.query)
  io.sockets.emit('press', { key: 'g' })
  res.send('Hora de dropar')  
})

server.listen(port, () => {
  console.log('listening on ' + port);
});
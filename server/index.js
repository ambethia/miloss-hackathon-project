/* eslint no-console: 0 */

import path from 'path';
import express from 'express';
import http from 'http';

const ROOT_PATH = path.resolve(__dirname, '..');
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'dist');
const DEFAULT_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server);

app.use(express.static(PUBLIC_PATH));

// app.get('/foo', (req, res) => {
//   res.send('bar');
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('camera', (msg) => {
    socket.broadcast.emit('camera', msg);
  });
});

if (process.env.NODE_ENV !== 'production') require('./dev')(app);

server.listen(PORT);

import path from 'path';
import express from 'express';
import http from 'http';
import expressSession from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import socketSession from 'express-socket.io-session';
import socketIO from 'socket.io';
import uuid from 'uuid';

const ROOT_PATH = path.resolve(__dirname, '..');
const PUBLIC_PATH = path.resolve(ROOT_PATH, 'dist');
const DEFAULT_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_PORT;

const RedisStore = connectRedis(expressSession);
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const client = redis.createClient(process.env.REDIS_URL);
const session = expressSession({
  store: new RedisStore({client}),
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
});

app.use(session);
io.use(socketSession(session, {
  autoSave: true
}));

app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('Session Error!'));
  }
  next();
});

app.use(express.static(PUBLIC_PATH));

// app.get('/foo', (req, res) => {
//   res.send('bar');
// });

io.on('connection', (socket) => {
  const sess = socket.handshake.session;

  if (!sess.user) {
    sess.user = {
      id: uuid.v4(),
      color: '#c7b27a',
      name: 'anonymous'
    };
  }

  socket.emit('user:connect', sess.user);

  socket.on('disconnect', () => {
    socket.emit('user:disconnect', sess.user.id);
  });

  socket.on('camera', (msg) => {
    socket.broadcast.emit('camera', msg);
  });
});

if (process.env.NODE_ENV !== 'production') {
  require('./dev')(app);
} else {
  app.get('*', function response(req, res) {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
  });
}

server.listen(PORT);

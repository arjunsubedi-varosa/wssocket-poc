const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*', // Allow any origin
    methods: ['GET', 'POST'] // Allow GET and POST methods
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/message', (req, res) => {
  const message = req.body.message;

  io.emit('eventName', `You said: ${message}`);

  res.json({ message: 'Message sent!' });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for the dynamic event name
  socket.on('eventName', (message) => {
    console.log('received message:', message);

    // Emit the message on the same dynamic event name
    io.emit('eventName', `You said: ${message}`);
  });
});

http.listen(4000, () => {
  console.log('listening on http://localhost:4000');
});

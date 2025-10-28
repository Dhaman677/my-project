// Import required modules
const express = require('express');
const http = require('http');                      
const { Server } = require('socket.io');           
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io on top of the HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',  // for dev — allow all origins
    methods: ['GET', 'POST']
  }
});

// Store connected users
const users = new Map();

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // User joins
  socket.on('join', (name) => {
    users.set(socket.id, name || 'Anonymous');
    socket.broadcast.emit('user-connected', {
      id: socket.id,
      name: users.get(socket.id)
    });
  });

  // Handle chat messages
  socket.on('chat-message', (payload) => {
    const msg = {
      id: Date.now() + '-' + Math.random().toString(36).substring(2, 9),
      name: payload.name || users.get(socket.id) || 'Anonymous',
      message: payload.message,
      ts: new Date().toISOString()
    };
    io.emit('chat-message', msg);
  });

  // Disconnect
  socket.on('disconnect', () => {
    const name = users.get(socket.id) || 'Anonymous';
    users.delete(socket.id);
    console.log('Client disconnected:', socket.id);
    socket.broadcast.emit('user-disconnected', { id: socket.id, name });
  });
});

// Health check route
app.get('/', (req, res) => {
  res.send({ status: 'ok', time: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

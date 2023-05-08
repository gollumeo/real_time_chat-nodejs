// server.js

import { app } from './setup/config.js';
import { connectToDatabase } from './setup/mongoose.js';
import libs from './setup/libs.js';

const PORT = process.env.PORT || 6001;
const { Server } = libs;

// Connect to database
connectToDatabase()
    .then(() => {
        // Start HTTP server
        const server = app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));

        // Attach Socket.IO to the HTTP server
        const io = new Server(server);

        // Handle Socket.IO events
        io.on('connection', (socket) => {
            console.log(`New client connected: ${socket.id}`);

            // Emit a welcome message to the client
            socket.emit('message', 'Welcome to the chat app!');

            // Handle chat messages from the client
            socket.on('message', (message) => {
                console.log(`Received message from ${socket.id}: ${message}`);

                // Broadcast the message to all connected clients except the sender
                socket.broadcast.emit('message', message);
            });

            // Handle client disconnection
            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    })
    .catch((error) => console.log(`Connection failed: ${error}`));

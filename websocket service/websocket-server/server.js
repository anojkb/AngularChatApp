// // ECHO is on.
// const WebSocket = require('ws');
// const http = require('http');
// // Create a WebSocket server on port 8080
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', ws => {
//   console.log('Client connected');

//   ws.on('message', message => {
//     console.log(`Received message: ${message}`);
    
//     // Broadcast the message to all connected clients
//     wss.clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.send('Welcome to the WebSocket server!');
// });

// console.log('WebSocket server is running on ws://localhost:8080');

const http = require('http');
const WebSocket = require('ws');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(426, { 'Content-Type': 'text/plain' });
  res.end('Upgrade Required');
});

// Create a WebSocket server on top of the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log(`Received message: ${message}`);
    
    // Broadcast the message to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('Welcome to the WebSocket server!');
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});

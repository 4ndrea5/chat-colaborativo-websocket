const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let users = new Map();

wss.on('connection', (ws) => {
    const userId = `Usuario_${Math.floor(Math.random() * 1000)}`;
    users.set(ws, userId);

    ws.send(`Bienvenido ${userId}`);
    broadcast(`${userId} se ha unido al chat`);

    ws.on('message', (msg) => {
        broadcast(`${userId}: ${msg}`);
    });

    ws.on('close', () => {
        broadcast(`${userId} se ha desconectado`);
        users.delete(ws);
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

console.log("Servidor WebSocket corriendo en ws://localhost:8080");

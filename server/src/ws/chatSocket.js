import WebSocket, { WebSocketServer } from "ws";

export const chatSocketServer = new WebSocketServer({ noServer: true });

const rooms = {}; // chatId => [{ ws, name }]

chatSocketServer.on("connection", (ws, request, chatId) => {
  if (!rooms[chatId]) rooms[chatId] = [];

  let userName = "Anon";

  // Esperamos que el primer mensaje del cliente sea de tipo "join" con su nombre
  ws.once("message", (msg) => {
    const message = JSON.parse(msg.toString());
    if (message.join && message.senderName) {
      userName = message.senderName;
    }

    rooms[chatId].push({ ws, name: userName });

    // Notificar a todos que alguien se unió
    const joinMsg = { system: true, text: `${userName} se ha unido al chat` };
    rooms[chatId].forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) client.ws.send(JSON.stringify(joinMsg));
    });
  });

  ws.on("message", (msg) => {
    const message = JSON.parse(msg.toString());

    // Ignoramos el mensaje de join, ya lo manejamos
    if (message.join) return;

    const payload = {
      text: message.text,
      senderName: message.senderName || userName,
      system: false
    };

    rooms[chatId].forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) client.ws.send(JSON.stringify(payload));
    });
  });

  ws.on("close", () => {
    rooms[chatId] = rooms[chatId].filter((client) => client.ws !== ws);

    // Notificar que alguien se fue
    const leaveMsg = { system: true, text: `${userName} ha salido del chat` };
    rooms[chatId].forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) client.ws.send(JSON.stringify(leaveMsg));
    });
  });
});

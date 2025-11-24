import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useWebSocket = (chatId) => {
  const ws = useRef(null);
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId || !user) return;

    ws.current = new WebSocket(`ws://localhost:4000/ws/chat/${chatId}`);

    ws.current.onopen = () => {
      console.log("Conectado al chat:", chatId);

      // Enviar mensaje de unión al conectar
      ws.current.send(JSON.stringify({ join: true, senderName: user.name }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.current.onclose = () => {
      console.log("Desconectado del chat:", chatId);
    };

    return () => {
      ws.current.close();
    };
  }, [chatId, user]);

  const sendMessage = (text) => {
    if (!text.trim() || !user) return;
    const message = { text, senderName: user.name };
    ws.current.send(JSON.stringify(message));
  };

  const leaveChat = () => {
    ws.current.close();
    setMessages([]);
  };

  return { messages, sendMessage, leaveChat };
};

import { useParams, useNavigate } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ChatRoomPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { messages, sendMessage, leaveChat } = useWebSocket(chatId);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const handleSend = () => {
    sendMessage(text);
    setText("");
  };

  const handleLeave = () => {
    leaveChat();
    navigate("/dashboard");
  };

  return (
    <div className="chat-room-container">
      {/* Header */}
      <header className="chat-header">
        <div>Usuario: {user?.name}</div>
        <div>
          <button onClick={handleLeave}>Salir del chat</button>
        </div>
      </header>

      {/* Chat */}
      <div className="messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.system ? "system-message" : ""}`}
          >
            {!m.system && <strong>{m.senderName}</strong>}
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

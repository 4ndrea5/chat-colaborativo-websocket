import { useEffect, useState } from "react";
import { getChats, createChat } from "../api/chat";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [chats, setChats] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getChats();
      setChats(data);
    })();
  }, []);

  const handleCreate = async () => {
    const chat = await createChat(newChatName);
    setChats([...chats, chat]);
    setNewChatName("");
  };

  return (
    <div className="dashboard-container">
      <h1>Chats</h1>
      <input
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        placeholder="Nuevo chat"
      />
      <button onClick={handleCreate}>Crear</button>

      <ul>
        {chats.map((c) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => navigate(`/chat/${c.id}`)}>Entrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

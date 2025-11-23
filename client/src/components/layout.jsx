import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);             // limpiar usuario en contexto
    navigate("/login");        // redirigir a login
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <h2>Chat Colaborativo</h2>
        {user ? (
          <div>
            <span>{user.name}</span>
            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <span>No has iniciado sesión</span>
        )}
      </header>
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  );
}

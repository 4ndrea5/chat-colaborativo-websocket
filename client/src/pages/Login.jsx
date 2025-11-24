import { loginWithGoogle } from "../api/auth";

export default function Login() {
  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>
      <button onClick={loginWithGoogle}>
        Iniciar sesión con Google
      </button>
    </div>
  );
}

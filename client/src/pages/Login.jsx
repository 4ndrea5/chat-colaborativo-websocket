import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div>
      <h2>Iniciar sesión</h2>

      {/* Botón original de password (si lo mantienes) */}
      
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          loginWithGoogle(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Error al iniciar sesión con Google");
        }}
      />
    </div>
  );
}

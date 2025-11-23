# **README – Configuración de Autenticación con Google (Node.js + React)**

Este documento explica paso a paso cómo configurar las **credenciales de Google**, cómo añadirlas al archivo **.env**, y qué dependencias instalar para que la autenticación Google funcione correctamente en tu proyecto **Node.js (server)** y **React (client)**.

---

# ## **1. Crear credenciales en Google Cloud (paso a paso)**

### **1.1 Abrir la consola de Google**

1. Ve a **Google Cloud Console** → **APIs & Services** → **OAuth consent screen**.
2. Selecciona el tipo de acceso:

   * **External** → si tu aplicación será usada por cualquier usuario con cuenta Google.
   * **Internal** → solo usuarios de tu organización (Google Workspace).
3. Completa:

   * Nombre de la app
   * Correo de soporte
   * Logo (opcional)
   * Dominios autorizados
4. Guarda los cambios.

### **1.2 Habilitar APIs (opcional pero recomendado)**

Si tu app usará servicios adicionales de Google, habilítalos en:

**APIs & Services → Library**

> Para el login básico *no es obligatorio*, pero si consumirás otras APIs, actívalas allí.

### **1.3 Crear credenciales OAuth**

1. Ve a: **APIs & Services → Credentials → Create Credentials → OAuth client ID**
2. Configura lo siguiente:

#### **Application type:**

✔ Web application

#### **Name:**

`chat-grupal-web`

#### **Authorized JavaScript origins:**

Ejemplos:

```
http://localhost:3000
https://mi-dominio.com
```

#### **Authorized redirect URIs:**

(Útiles solo si usas OAuth con redirección, no necesarios para Google One Tap / GSI)

```
http://localhost:3000/auth/google/callback
https://mi-dominio.com/auth/google/callback
```

### **1.4 Obtener credenciales**

Google generará:

* **Client ID**
* **Client Secret**

Guarda ambos **solo en el servidor**, nunca en el frontend.

---

# ## **2. Variables de entorno (.env)**

Tu proyecto debe tener **dos archivos .env**: uno para el **client** (React) y otro para el **server** (Node.js).

---

## **2.1 Archivo: `client/.env`**

```env
VITE_GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUÍ
```

> Este valor es de acceso público porque el frontend lo necesita para el botón de login.

---

## **2.2 Archivo: `server/.env`**

```env
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUÍ
GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET_AQUÍ

DATABASE_URL="postgresql://postgres:jafetcana@localhost:5432/chatcolab"

DB_NAME=chatcolab
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_HOST=localhost

SESSION_SECRET=MiClaveUltraSegura
```

---

# ## **3. Instalación de dependencias necesarias**

### **3.1 Dependencias del servidor (Node.js)**

Ejecuta:

```bash
npm install google-auth-library jsonwebtoken cookie-parser express cors dotenv
```

Dependencias comunes en servidores con autenticación:

* `google-auth-library` → para verificar el **ID token** de Google
* `jsonwebtoken` → para crear JWT propios
* `cookie-parser` → para manejar cookies de sesión
* `express` → backend
* `cors` → permitir peticiones desde el frontend
* `dotenv` → leer variables del `.env`

### **3.2 Si usas Socket.IO (para tu chat)**

```bash
npm install socket.io
```

---

### **3.3 Dependencias del cliente (React)**

Instalar si aún no lo tienes:

```bash
npm install axios
```

Y en tu HTML debes cargar Google Identity Services:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

---

# ## **4. Flujo general de autenticación (resumen)**

1. El frontend (React) muestra el botón de Google usando `VITE_GOOGLE_CLIENT_ID`.
2. Google devuelve un **ID token**.
3. El cliente envía ese ID token al backend vía `/auth/google`.
4. El backend verifica el token usando `google-auth-library`.
5. Si es válido:

   * Crea una sesión (cookie)
   * o genera un JWT para el cliente
6. El frontend recibe ese JWT y se conecta al WebSocket usando ese token.

---

# ## **5. Script base de datos**
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  google_id VARCHAR(255),
  picture TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  chat_id INTEGER REFERENCES chats(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);



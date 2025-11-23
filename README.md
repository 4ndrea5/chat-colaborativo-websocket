###Historias de usuario

HU1 — Registro de Usuario
Como nuevo usuario
quiero crear una cuenta en el sistema
para poder usar el chat colaborativo.

Criterios de aceptación:

Debe pedir: nombre, email, contraseña.

Validar email único.

En caso de fallo, mostrar mensaje claro.

Guardar usuario en base de datos.

HU2 — Inicio de Sesión

Como usuario registrado
quiero iniciar sesión
para acceder a mis salas de chat.

Criterios:

Validar email y contraseña.

Generar token JWT.

Guardar sesión en localStorage.

Mostrar mensaje si las credenciales son incorrectas.

HU3 — Crear Sala de Chat

Como usuario autenticado
quiero crear una sala de chat
para invitar a otros usuarios y conversar.

Criterios:

Permitir asignar nombre de sala.

Generar ID único.

Guardar en base de datos.

Usuario creador queda unido automáticamente.

HU4 — Unirse a Sala de Chat

Como usuario autenticado
quiero unirme a una sala existente
para poder participar en una conversación.

Criterios:

Permitir ingresar código o seleccionar sala.

Validar que la sala exista.

Agregar usuario al listado de miembros.

HU5 — Asignación Automática de Usuario Temporal

Como usuario que entra al WebSocket
quiero recibir un nombre temporal automático
para identificarme aunque no haya puesto un nombre real.

Ej: "Usuario_847"

HU6 — Enviar Mensajes en Tiempo Real

Como usuario en una sala
quiero enviar mensajes y recibirlos al instante
para mantener comunicación fluida.

Criterios:

Solo WebSockets, no polling.

Todos los usuarios conectados deben recibir el mensaje.

Guardar historial en BD.

HU7 — Notificar Entradas y Salidas

Como participante del chat
quiero recibir avisos cuando alguien entra o sale
para saber quién está conectado.

Ejemplo:

🔵 "Juan se ha unido al chat"

🔴 "María ha salido"

HU8 — Mostrar Historial de Chat

Como usuario que entra a una sala
quiero ver los mensajes anteriores
para entender el contexto del chat.

HU9 — Cerrar Sesión

Como usuario autenticado
quiero cerrar mi sesión
para proteger mi cuenta en dispositivos públicos.

Estructura
server/
│
├── src/
│   ├── config/
│   │   ├── db.js                 # conexión a la base de datos
│   │   └── websocket.js          # inicialización WebSocket
│   │
│   ├── controllers/
│   │   ├── authController.js     # registro, login
│   │   ├── chatController.js     # crear sala, unirse, listar salas
│   │   └── messageController.js  # obtener historial
│   │
│   ├── services/
│   │   ├── authService.js        # lógica de auth
│   │   ├── chatService.js        # lógica de salas
│   │   └── messageService.js     # lógica de mensajes
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js     # verifica token JWT
│   │
│   ├── models/
│   │   ├── User.js               # modelo usuario
│   │   ├── Chat.js               # modelo sala
│   │   └── Message.js            # modelo mensaje
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # /auth/register /auth/login
│   │   ├── chatRoutes.js         # /chat/create /chat/join
│   │   └── messageRoutes.js      # /messages/:chatId
│   │
│   ├── websocket/
│   │   ├── wsServer.js           # servidor WebSocket principal
│   │   ├── wsHandlers.js         # manejar eventos (join, leave, msg)
│   │   └── wsEvents.js           # constantes de eventos
│   │
│   ├── utils/
│   │   ├── generateUsername.js   # usuario temporal
│   │   └── token.js              # utilidades JWT
│   │
│   ├── app.js                    # configuración principal de Express
│   └── server.js                 # arranque del servidor HTTP + WS
│
├── .env
├── package.json
└── README.md
client/
│
├── src/
│   ├── api/
│   │   └── auth.js              # login / register
│   │   └── chat.js              # createChat / joinChat
│   │
│   ├── components/
│   │   ├── ChatRoom.jsx         # vista del chat
│   │   ├── ChatMessage.jsx      # cada msg
│   │   └── InputMessage.jsx     # input para enviar
│   │
│   ├── context/
│   │   ├── AuthContext.jsx      # manejar session
│   │   └── ChatContext.jsx      # manejar mensajes del websocket
│   │
│   ├── hooks/
│   │   └── useWebSocket.js      # conectar al WebSocket
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx        # crear/unirte a chats
│   │   └── ChatRoomPage.jsx     # pantalla de chat
│   │
│   ├── utils/
│   │   └── storage.js           # manejar tokens localStorage
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       └── main.css
│
├── package.json
└── vite.config.js

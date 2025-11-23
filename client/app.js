const ws = new WebSocket("ws://localhost:8080");
let myId = null;

const statusEl = document.getElementById('status');
const chatEl = document.getElementById('chat');
const inputEl = document.getElementById('msg');

ws.onopen = () => {
    statusEl.textContent = 'Conectado';
    statusEl.classList.add('connected');
};

ws.onmessage = (event) => {
    const text = event.data;

    // Detectar mensaje de bienvenida para conocer nuestro ID
    if (text.startsWith('Bienvenido ')) {
        myId = text.replace('Bienvenido ', '').trim();
        appendSystem(text);
        return;
    }

    if (text.includes('se ha unido') || text.includes('se ha desconectado')) {
        appendSystem(text);
        return;
    }

    // Si el mensaje viene con el formato "Usuario_x: mensaje"
    const colonIndex = text.indexOf(':');
    if (colonIndex > 0) {
        const author = text.substring(0, colonIndex).trim();
        const content = text.substring(colonIndex + 1).trim();
        const isSelf = myId && author === myId;
        appendMessage(author, content, isSelf);
        return;
    }

    // Mensaje por defecto
    appendSystem(text);
};

ws.onclose = () => {
    statusEl.textContent = 'Desconectado';
    statusEl.classList.remove('connected');
};

ws.onerror = (err) => {
    console.error('WebSocket error', err);
};

function sendMessage() {
    const value = inputEl.value.trim();
    if (!value) return;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(value);
        inputEl.value = '';
    } else {
        appendSystem('No conectado — mensaje no enviado');
    }
}

function appendSystem(text) {
    const el = document.createElement('div');
    el.className = 'message system';
    el.textContent = text;
    chatEl.appendChild(el);
    scrollToBottom();
}

function appendMessage(author, content, isSelf) {
    const el = document.createElement('div');
    el.className = 'message ' + (isSelf ? 'self' : 'other');

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = content;

    const meta = document.createElement('div');
    meta.className = 'meta';
    const time = new Date();
    meta.textContent = (isSelf ? 'Tú' : author) + ' · ' + time.toLocaleTimeString();

    el.appendChild(bubble);
    el.appendChild(meta);
    chatEl.appendChild(el);
    scrollToBottom();
}

function scrollToBottom() {
    chatEl.scrollTop = chatEl.scrollHeight;
}

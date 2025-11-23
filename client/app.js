const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (event) => {
    const chat = document.getElementById("chat");
    const msg = document.createElement("p");
    msg.textContent = event.data;
    chat.appendChild(msg);
};

function sendMessage() {
    const input = document.getElementById("msg");
    ws.send(input.value);
    input.value = "";
}

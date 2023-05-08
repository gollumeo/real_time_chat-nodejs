const clientSocket = io();

clientSocket.on('message', (data) => {
    const messageList = document.getElementById('messages');

    const messageElement = document.createElement('li');
    messageElement.innerText = data;

    messageList.appendChild(messageElement);
});

const form = document.getElementById('message-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageInput = document.getElementById('message-input');

    clientSocket.emit('message', messageInput.value);

    messageInput.value = '';
});

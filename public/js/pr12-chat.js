const socket = io('/'); 

const chatBox = document.getElementById('chatBox');
const messageEl = document.getElementById('message');
const user = document.getElementById('user');
const date = new Date(); 

socket.on('newMessage', (data) => {
  addMessage(data, false);
});

const getTime = () => {
  const d = new Date();

  const hours = d.getHours().toString().padStart(2, '0');
  const mins = d.getMinutes().toString().padStart(2, '0');

  return `${hours}:${mins}`;
};

const postMessage = () => {
  const message = messageEl.value.trim();
  const from = user.value;
  const time = getTime();

  const data = { message, from, time };

  socket.emit('message', data);

  addMessage(data, true);

  messageEl.value = '';
};

const addMessage = (data = {}, user = false) => {
  chatBox.innerHTML += `
    <li class="message${user ? ' uMessage' : ''}">
        ${data.from} @${data.time}: ${data.message}
    </li>
    `;
};
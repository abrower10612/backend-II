const socket = io('/'); 

const chatBox = document.getElementById('chatBox');
const messageEl = document.getElementById('message');
const user = document.getElementById('user');
const date = new Date(); 

socket.on('newMessage', (data) => {
  addMessage(data, false);
});

const getTime = () => {
  const time = new Date();
  if (time.getHours() >= 12) {
    const hours = time.getHours() % 12;
    const mins = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${mins} PM`;
  }

  const hours = time.getHours();
  const mins = time.getMinutes().toString().padStart(2, '0');
  return ` ${hours}:${mins} AM`;
};

const postMessage = () => {
  const message = messageEl.value.trim();
  const from = user.value;
  const time = getTime();



  if (message.length < 1) {
    alert("Message must be at least one character, please try again.")
  }
  else {
    const data = { message, from, time };

    socket.emit('message', data);

    addMessage(data, true);
  
    messageEl.value = '';
  }

};

const addMessage = (data = {}, user = false) => {
  chatBox.innerHTML += 
  `
    <div class="${user ? 'me-message-container' : 'them-message-container'}">
      <li class="message${user ? ' uMessage' : ''}">
      ${data.from} said: \<br>${data.message}
      </li>
      <p class="message-time">${data.time}</p>
    </div>
  `;
};
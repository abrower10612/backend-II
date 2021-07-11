const socket = io('/');

const errorContainer = document.getElementById('errMsg');
const usernameInput = document.getElementById('username');
const date = new Date();

const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
  });
  return response.json();
};

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

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

const login = async () => {
  const username = usernameInput.value;

  errorContainer.innerHTML = '';
  if (!username || username.trim() === '') {
    errorContainer.innerHTML = 'Username cannot be empty!';
    return;
  }

  const data = await postData('/login', {
    username,
  });

  if (data.error) {
    errorContainer.innerHTML = data.error;
    return;
  }

  socket.emit('newUser', username, getTime());
  window.location = '/chat';
};
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const PORT = process.env.PORT || 5000;

const app = express();

const routes = require('./routes/routes');

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(
    session({
      secret: 'my secret',
      cookie: {
        httpOnly: false,
      },
    })
  )
  .use('/', routes);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('Connected.');

  socket
    .on('disconnect', () => {
      console.log('Disconnected.');
    })
    .on('newUser', (username, time) => {
      const message = `${username} has entered the chat.`;
      socket.broadcast.emit('newMessage', {
        message,
        time,
        from: 'admin',
      });
    })
    .on('message', (data) => {
      socket.broadcast.emit('newMessage', {
        ...data,
      });
    });
});
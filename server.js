const Express = require('express'); // eslint-disable-line
const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

http.listen(3001);


io.on('connection', (socket) => {
  console.log('connect: ', socket.id); // eslint-disable-line
  let now = moment().format('MM/DD/YY hh:mm:ss a');
  io.emit('chat', `Welcome to chat! I'm the server! (${now})`);
  io.emit('game-init', socket.id);
  socket.on('chat', (message) => {
    now = moment().format('MM/DD/YY hh:mm:ss a');
    console.log(`MESSAGE: ${message} (${now})`); // eslint-disable-line
    io.emit('chat', `${message} (${now})`);
  });


  socket.on('move', (hero) => {
    console.log(`HEROPOS: (${JSON.stringify(hero)})`); // eslint-disable-line
    io.emit('other-player', hero);

  });

  socket.on('heroclick', () => {
    console.log('clicked!'); // eslint-disable-line
  });

  socket.on('disconnect',
    () => console.log('disconnect: ', socket.id)); // eslint-disable-line
});

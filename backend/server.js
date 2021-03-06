const http = require ('http');
const app = require ('./app.js');
const bodyParser = require ("body-parser");
const userRoutes = require ('./routes/user.js');
const messageRoutes = require ('./routes/message.js');
const likeRoutes = require ('./routes/like.js');


const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended : true }));

  app.set('port', port);
  app.use('/api/messages', messageRoutes);
  app.use('/api', userRoutes);
  app.use('/api', likeRoutes);


  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
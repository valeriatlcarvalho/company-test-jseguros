const app = require('../src/app');
const port = '3030'
const hostname = 'localhost'

app.listen(port, hostname, function () {
  console.log(`app listening on port http://${hostname}:${port}`)
})



// const http = require('http');

// const hostname = '127.0.0.1';
// const port = '3030';

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/json');
//   res.end('Hello, World!');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

let { createServer } = require('http');
let { createReadStream } = require('fs');
function handleRequest(req, res) {
  createReadStream('readme.txt').pipe(res);
}
let server = createServer(handleRequest);
server.listen(2000, () => console.log('server is listening on port 1000'));

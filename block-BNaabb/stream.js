let http = require('http');

let server = http.createServer(handleRequest);

function handleRequest(reqest, response) {
  let store = '';
  if (reqest.method === 'POST' && reqest.url === '/') {
    reqest.on('data', (chunk) => {
      store = store + chunk;
    });

    reqest.on('end', () => {
      response.write(store);
      response.end();
    });
  }
}

server.listen(3456, () => console.log('server is listening on port 3456'));







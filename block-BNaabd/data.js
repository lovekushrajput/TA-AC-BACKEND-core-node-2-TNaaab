let http = require('http');
let query = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let dataFormat = req.headers['content-type'];
  let store = '';

  if (req.method === `POST` && req.url === `/json`) {
    req.on('data', (chunk) => {
      store = store + chunk;
    });

    req.on('end', () => {
      if (dataFormat === 'application/json') {
        let formatType = JSON.parse(store);
        res.end(store);
      }
    });
  } else if (req.method === `POST` && req.url === `/form`) {
    req.on('data', (chunk) => {
      store = store + chunk;
    });

    req.on('end', () => {
      if (dataFormat === 'application/x-www-form-urlencoded') {
        let parsedQuery = query.parse(store, true);
        res.end(JSON.stringify(parsedQuery));
      }
    });
  }
}
server.listen(7000, () => console.log('server is listening on port 7000'));

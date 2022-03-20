// console.log('/client/index.js')
// console.log(__dirname + '/client/index.js')

let http = require('http')
let fs = require('fs')
let qs = require('querystring')

let server = http.createServer(handleRequest)
function handleRequest(req, res) {
    if (req.method === 'GET' && req.url === '/form') {
        fs.readFile('form.html', (err, content) => {
            if (err) return console.log(err)
            res.end(content)
        })
    }
    let store = ''
    req.on('data', (chunks) => store += chunks)
    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/form') {
          let parsedData = qs.parse(store)
          res.setHeader('Content-Type','text/html')
          res.write(`<h1>${parsedData.name}</h1>`)
          res.write(`<h2>${parsedData.email}</h2>`)
          res.write(`<h3>${parsedData.age}</h3>`)
            res.end()
        }
    })


}
server.listen(3000, () => console.log('server is listening on port 3000'))
let path = require('path');
let http = require('http');
let qs = require('querystring');

let absolutePath_server = __dirname;
let absolutePath_app = path.join(__dirname, 'app.js');
let relativePath_index = './index.html';
let absolutePath_index = path.join(__dirname, 'index.html');
console.log(absolutePath_server);
console.log(absolutePath_app);
console.log(relativePath_index);
console.log(absolutePath_index);

// creating server and capture data on server
let server = http.createServer(handleRequest);
function handleRequest(req, res) {
    let store = ''
 req.on('data',(chunk)=> store += chunk)
 req.on('end',()=>{
     res.writeHead(201,{"Content-Type":"application/form-data"})
     res.end(store);
 })
};
server.listen(3456);


// Create server which can handle both json/form data
let server2 = http.createServer(handleRequest2)

function handleRequest2(req,res){
let dataFormat = req.headers['content-type']
let store = ''
req.on('data',(chunk)=> store += chunk)
req.on('end',()=>{
  if(dataFormat==="application/x-www-form-urlencoded"){
    console.log(dataFormat)
let parsed = qs.parse(store,true)
res.end(JSON.stringify(parsed))
  }
})
}

server2.listen(9000)

// create server, send json data in request from postman
let server3 = http.createServer(handleRequest3)

function handleRequest3(req,res){
    let store = ''
req.on('data',(chunk)=> store += chunk)
req.on('end',()=>{
    let parseData=qs.parse(store)
 res.setHeader('Content-Type','text/html')
 res.write(`<h2>${parseData.email}</h2>`)
 res.end()
})
}
server3.listen(7000,()=>  console.log('server is listening on port 7000'))
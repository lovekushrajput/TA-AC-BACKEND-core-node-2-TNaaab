let path = require('path');
let http = require('http');
let fs = require('fs');
let qs = require('querystring');
let url = require('url');

// define a users directory at top where all users will be stored
// const userDir = __dirname + "/users/";
// OR using path module
// make sure to require path module if using
const userDir = path.join(__dirname, "users/");
// console.log(userDir)



let server = http.createServer(handleRequest)
function handleRequest(req, res) {
    let parsedUrl = url.parse(req.url, true)
    // console.log(userDir + parsedUrl.query.username + '.json')
    // captured data in stringified JSON format
    var store = "";

    // CREATING FILE
    // check for post request coming on '/users'

    // grab the username from store data
    req.on('data', (chunks) => store += chunks)
    req.on('end', () => {
        var parseData = qs.parse(store)
        var userName = qs.parse(store).username;
        if (parsedUrl.pathname === "/users" && req.method === "POST") {

            // check whether this username exists in users directory or not

            // We have to create a file using username + append .json to create a proper file

            // wx flag ensures that given username.json should not already exist in users directory, therwise throws an error

            fs.open(userDir + userName + ".json", "wx", (err, fd) => {
                // fd is pointing to newly created file inside users directory
                // once file is created, we can write content to file
                // since store has all the data of the user
                if (err) return console.log(err)
                console.log('file created')
                fs.writeFile(fd, JSON.stringify(parseData), (err) => {
                    // err indicated file was not written
                    // if no error, file was written successfully
                    if (err) return console.log(err)
                    console.log('file was written successfully')
                    // close the file
                    fs.close(fd, (err) => {
                        // if no err, send response to client
                        if (err) return console.log(err)
                        console.log('file closed')
                        res.end(`${userName} successfully created`);
                    });
                });
            });


        }

        // TO GET THE USER
        else if (parsedUrl.pathname === '/users' && req.method === "GET") {
            fs.readFile(userDir + parsedUrl.query.username + '.json', (err, user) => {
                if (err) return console.log(err)
                // send the user through response
                res.end(user)
            })
        } else

            // TO DELETE THE USER
            if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
                fs.unlink(userDir + parsedUrl.query.username + '.json', (err) => {
                    if (err) return console.log(err);
                    res.end(`${parsedUrl.query.username} file deleted`)
                })
            } else if (parsedUrl.pathname === "/users" && req.method === "PUT") {
                fs.open(userDir + parsedUrl.query.username + ".json", "r+", (err, fd) => {
                    if (err) return console.log(err)

                    // TO UPDATE USER
                    // remove the content of file using `fs.ftruncate`
                    fs.ftruncate(fd, (err) => {
                        if (err) return console.log(err)
                        fs.writeFile(userDir + parsedUrl.query.username + ".json", JSON.stringify(parseData), (err) => {
                            if (err) return console.log(err)
                            fs.close(fd, (err) => {
                                if (err) return console.log(err)
                                res.end(`${parsedUrl.query.username} file updated successfully`)

                            })
                        })
                    })
                })
            } else {
                res.end('404 page not found')
            }

    })
}
server.listen(3000, () => console.log('server is listening on port 3000'))
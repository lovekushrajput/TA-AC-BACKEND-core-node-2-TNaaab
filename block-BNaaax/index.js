// 1. console.log(\_\_dirname);
console.log(__dirname);

// 2. console.log(\_\_filename);
console.log(__filename);

// 3. use path module to join `__dirname` and `server.js`
let path = require('path');
let pathName = path.join(__dirname, 'server.js');
console.log(pathName);

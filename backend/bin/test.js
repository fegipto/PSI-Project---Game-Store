// Include path module
var path = require("path");
  
// Methods to display directory
console.log("__dirname:    ", __dirname);
var back = path.resolve(__dirname, '..')
console.log("__dirname:    ", path.join(path.resolve(path.resolve(__dirname, '..'), '..'), "node-modules/http"));
console.log("__dirname:    ", path.dirname(__dirname).split(path.sep));
console.log("process.cwd() : ", process.cwd());
console.log("./ : ", path.resolve("./"));
console.log("filename: ", __filename);
// const original = {
//   a: 1,
//   b: {
//     c: 3,
//   },
// };

// const modifiedCopy = { ...original, d: 4 };
// console.log(original);
// console.log(modifiedCopy);

// const original = { a: 3, b: { prop: false } };
// original.b.prop = true;
// original.a = 2;
// const copy = { ...original };
// original.a = 5;
// original.b.prop = false;
// console.log(copy);

// la copeie d'une variable prend la valeaur , la copie d'un objet prend la reference

// function repeter() {
//   setTimeout(function run() {
//     console.log("hello");
//     repeter();
//   }, 1000);
// }

/*
console.log("Program started");
const promise3secondes = new Promise((resolve) => {
  setTimeout(resolve("program 1 complete"), 2000);
});
console.log("Program in progress.....");
const promise2secondes = new Promise((resolve) => {
  setTimeout(resolve("program 2 complete"), 3000);
});
promise3secondes.then(promise2secondes);
*/
const path = require("node:path");

// console.log(__filename);
// console.log(__dirname);

// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));
// console.log(path.isAbsolute(__filename));
// console.log(path.isAbsolute("./node.js"));
/*const http = require("node:http");

const server = http.createServer((req, res) => {
  res.write("Hello World!"); //write a response to the client
  res.end(); //end the response
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});*/
const http = require("node:http");
const server = http.createServer((req, res) => {
  req.url === "/";
  res.writeHead(200, { "Content-Type": "text/palin" });

  res.end("Home page");
});
server.listen(3000, () => {
  console.log(Server running on port 3000");
});

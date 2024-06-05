/* eslint-disable */
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 4000}`);
});
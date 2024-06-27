/* eslint-disable */
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 4000}`);
});


// et là notre server qui permet de faire la liaison entre les requetes et les réponses en écoutant et répondant aux requetes

//-> faker.js
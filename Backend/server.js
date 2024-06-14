/* eslint-disable */
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 4000}`);
});


// et là notre server qui permet de faire la liaison entre les requetes et les réponses en écoutant et répondant aux requetes

//modifications à faire => 
/* 
=> finir  les raccords des controlers avec les routes (problème d'import des fonctions à voir) (normalement bon)
=> installer le doc data du (../../public/data/data.json) // pratiquement bon (en cours)
=> installer les images dans le public/images
=> faire les tests d'intégration
=> tester le login et le signup
=> tester les routes des livres (post, put, delete)

*/
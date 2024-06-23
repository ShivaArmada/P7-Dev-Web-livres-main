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
=> finir  les raccords des controlers avec les routes (problème d'import des fonctions à voir) (bon)
=> installer le doc data du (../../public/data/data.json) // pratiquement bon (bon)
=> installer les images dans le public/images (quasi bon)
=> faire les tests d'intégration (quasi bon)
=> tester le login et le signup (bon)
=> tester les routes des livres (post, put, delete) (bon, sauf bestRating)



=> modifications à faire pour finir le projet :
- trouver pourquoi le bestRating ne fonctionne pas (tenter avec une fonction comme vu en mentorat ?)
-> faker.js
*/
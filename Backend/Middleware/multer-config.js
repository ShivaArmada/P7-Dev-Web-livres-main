/*eslint-disable*/

const multer = require("multer");
// Optimisation des images
const sharp = require("sharp");

const path = require("path");
//gerer le fichier d'image
const fs = require("fs");

// Configuration du stockage
const storage = multer.diskStorage({
  // Destination des fichiers
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // Nom de fichier
  filename: (req, file, cb) => {
    const name = file.originalname.slice(0, 3);
    cb(null, name + Date.now() + ".webp");
  },
});

// Filtre de fichier
const fileFilter = (req, file, callback) => {
  !file.originalname.match(/\.(jpg|jpeg|png|webp)$/)
    ? callback(
        new Error("Seuls les fichiers JPG, JPEG, PNG et WEBP sont autorisés !"),
        false
      )
    : callback(null, true);
};

// Création du dossier images s'il n'existe pas
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

// Configuration de Multer
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

module.exports = upload;

module.exports.optimizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join("images", `resized_${fileName}`);

  // Optimisation de l'image avec sharp
  sharp.cache(false);
  sharp(filePath)
    .resize({ width: 206, height: 260 })
    .toFile(outputFilePath)
    .then(() => {
      console.log(`Image ${fileName} optimisée avec succès `);

      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        console.log(
          `Image ${fileName} supprimée avec succès (format non optimisé inutile) `
        );
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

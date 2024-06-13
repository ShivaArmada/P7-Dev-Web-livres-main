/*eslint-disable*/
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + Date.now() + '.' + extension); // Use the original filename for the uploaded file
  },
});

// Création du dossier images s'il n'existe pas
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}


module.exports.optimizeImage = (req, res, next) => {
  // On vérifie si un fichier a été téléchargé
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join("images", `resized_${fileName}`);

  // Désactivation du cache pour éviter les problèmes de mémoire
  sharp.cache(false);
  sharp(filePath)
    .resize({ height: 600 })
    .toFile(outputFilePath)
    .then(() => {
      console.log(`Image ${fileName} optimisée avec succès !`);
      // Remplacer le fichier original par le fichier optimisé
      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        console.log(`Image ${fileName} supprimée avec succès !`);
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};



// Initialize multer
const uploadImage = multer({ storage }).single("image");

module.exports = uploadImage;



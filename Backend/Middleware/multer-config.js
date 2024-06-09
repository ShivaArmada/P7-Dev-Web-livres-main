/*eslint-disable*/
const multer = require("multer");

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

// Initialize multer
const uploadImage = multer({ storage }).single("image");

module.exports = uploadImage;



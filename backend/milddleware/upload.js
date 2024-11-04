const multer = require('multer');
const path = require('path');

// Définir le stockage pour les fichiers
const storage = (fileName, pathFloderImage)=>{
    multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
          cb(null, `${Date.now()}_${file.originalname}`);
        }
      });
}
 

// Vérifier le type de fichier
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Vérifier la taille de l'image
const checkFileSize = (req, file, cb) => {
  if (file.size > 1024 * 1024 * 5) { // Limite de fichier de 5 Mo
    return cb('Error: File size exceeds 5MB');
  } else {
    cb(null, true);
  }
};

// Configurer multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de fichier de 5 Mo
  fileFilter: (req, file, cb) => {
    fileFilter(req, file, (err) => {
      if (err) {
        return cb(err);
      } else {
        checkFileSize(req, file, cb);
      }
    });
  }
});

module.exports = upload;

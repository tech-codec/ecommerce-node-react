// utils/multer.js

const multer = require('multer');
const path = require('path');

// Définir le stockage pour les fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../shared/uploads/images/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Vérifier le type de fichier
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|avif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
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
                console.log("mon dossier : " + __dirname);
                cb(null, true);
            }
        });
    }
});

module.exports = upload;

import libs from './libs.js';
const { multer } = libs;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
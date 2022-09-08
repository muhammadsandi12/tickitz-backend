const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

const limits = {	
	filesize: 1024 * 1024 * 1,
};

const upload = multer({
	storage: storage,
	limits: {fileSize: 148667},
	fileFilter: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		if (
			ext !== '.png' &&
			ext !== '.jpg' &&
			ext !== '.gif' &&
			ext !== '.jpeg' &&
			ext !== '.webp'
		) {
			// cb(new Error('only .png, .jpg, .gif, jpeg format allowed'),false)
			return req.res.send({
				message: 'only .png, .jpg, .gif, jpeg , webp format allowed',
			});
		}
		cb(null, true);
	},
});	

module.exports = upload;
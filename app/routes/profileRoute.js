module.exports = function(app, express) {
    let mime = require('mime');
    let multer = require('multer');
    let path = require('path');
    let router = express.Router();
    let ProfileController = require('../../app/controllers/ProfileController');
    let authorization = require('../../app/middlewares/user_TokenAuth');
    let adminAuthorization = require('../../app/middlewares/admin_TokenAuth');
    let storage = multer.diskStorage({
        destination: function(req, res, cb) {
            cb(null, path.join(__dirname, '../../public/images/profile-images'));
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '.' + mime.extension(file.mimetype));
        }
    });


    let upload = multer({ storage: storage });

    // profile routes
    router.get('/:id', authorization, ProfileController.getUserProfileDetails);
    router.post('/uploadIMage', authorization, upload.single('image'), ProfileController.uploadImage);
    router.post('/create', authorization, ProfileController.createUpdateProfile);
    router.post('/update/:id', authorization, ProfileController.updateProfile);

    app.use('/profile', router);
}

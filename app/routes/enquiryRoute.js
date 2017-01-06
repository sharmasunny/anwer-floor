module.exports = function(app, express) {
    let mime = require('mime');
    let multer = require('multer');
    let path = require('path');
    let router = express.Router();
    let EnquiryController = require('../../app/controllers/EnquiryController');
    let authorization = require('../../app/middlewares/user_TokenAuth');
    let adminAuthorization = require('../../app/middlewares/admin_TokenAuth');
    

    // profile routes
    router.get('/getAll', authorization, EnquiryController.getAllEnquiries);
    router.post('/create', authorization, EnquiryController.createEnquiry);
    router.get('/getProfileId/:id', authorization, EnquiryController.getProfileId);
    //router.post('/update/:id', authorization, ProfileController.updateProfile);

    app.use('/enquiry', router);
}

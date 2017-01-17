module.exports = function(app, express) {
    let router = express.Router();
    let messageController = require('../../app/controllers/messageController');
    let authorization = require('../../app/middlewares/user_TokenAuth');
    let adminAuthorization = require('../../app/middlewares/admin_TokenAuth');


    router.post('/send', messageController.sendMessage);
    router.get('/all/:id',messageController.getAllMessage);


    app.use('/message', router);

};

module.exports = function (app,express) {
	let router = express.Router();
	let ProfileController = require('../../app/controllers/ProfileController');
	let authorization = require('../../app/middlewares/user_TokenAuth');
	let adminAuthorization = require('../../app/middlewares/admin_TokenAuth');

	// profile routes
	router.get('/:id',authorization,ProfileController.getUserProfileDetails);

	app.use('/profile', router);
}
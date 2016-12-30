module.exports = function (app,express) {
	let router = express.Router();
	let addressBookController = require('../../app/controllers/addressBookController');
	let authorization = require('../../app/middlewares/user_TokenAuth');
	let adminAuthorization = require('../../app/middlewares/admin_TokenAuth');

	

	// profile routes
	router.post('/create',authorization,addressBookController.createAddressBook);
	router.get('/:id',authorization,addressBookController.getOneAddressBook);
	router.get('/all/:id',authorization,addressBookController.getAllAddressBook);
	router.post('/update/:id',authorization,addressBookController.updateAddressBook);
	router.get('/delete/:id',authorization,addressBookController.deleteAddressBook);

	router.get('/activity/all/:id',addressBookController.getAllActivity);

    router.post('/activity',authorization,addressBookController.saveActivity);



	router.post('/google',addressBookController.googleAddressBook);
	

	app.use('/address-book', router);

}
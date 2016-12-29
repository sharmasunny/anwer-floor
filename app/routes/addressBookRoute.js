module.exports = function (app,express) {
	let router = express.Router();
	let addressBookController = require('../../app/controllers/addressBookController');
	let authorization = require('../../app/middlewares/user_TokenAuth');
	let adminAuthorization = require('../../app/middlewares/admin_TokenAuth');

	app.post('/address-book',addressBookController.getContact);

	// profile routes
	router.post('/create',authorization,addressBookController.createAddressBook);
	router.get('/:id',authorization,addressBookController.getOneAddressBook);
	router.get('/all/:id',authorization,addressBookController.getAllAddressBook);
	router.post('/update/:id',authorization,addressBookController.updateAddressBook);
	router.get('/delete/:id',authorization,addressBookController.deleteAddressBook);

	//router.put('/update')
	

	app.use('/address-book', router);

}
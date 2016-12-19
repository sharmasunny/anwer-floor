module.exports = function (app) {

	var authroute = require('../../app/controllers/AuthController.js');

	app.post('/register', authroute.register);
	app.post('/confirmAccount', authroute.confirmOtp);
	app.post('/varifyEmail', authroute.varifyEmail);
	app.post('/confirmAccountForgot', authroute.confirmOtpForgot);
	app.post('/reSendOtp', authroute.reSendOtp);
	app.post('/login', authroute.login);
	app.post('/logOut', authroute.logOut);
	app.post('/forgot-password', authroute.forgot);
	app.post('/resetPassword', authroute.resetPassword);
	app.post('/checkUniqueEmail', authroute.checkUniqueEmail);

}
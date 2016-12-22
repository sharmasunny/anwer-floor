module.exports = function (app) {

	var authroute = require('../../app/controllers/AuthController.js');

	app.post('/auth/register', authroute.register);
	app.post('/auth/confirmAccount', authroute.confirmOtp);
	app.post('/auth/varifyEmail', authroute.varifyEmail);
	//app.post('/confirmAccountForgot', authroute.confirmOtpForgot);
	//app.post('/reSendOtp', authroute.reSendOtp);
	app.post('/auth/login', authroute.login);
	app.post('/auth/logOut', authroute.logOut);
	//app.post('/forgot-password', authroute.forgot);
	app.post('/auth/resetPassword', authroute.resetPassword);
	app.post('/auth/checkUniqueEmail', authroute.checkUniqueEmail);
}
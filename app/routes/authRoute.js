module.exports = function (app,express) {
	let router = express.Router();
	let authroute = require('../../app/controllers/AuthController');

	router.post('/register', authroute.register);
	router.post('/confirmAccount', authroute.confirmOtp);
	router.post('/varifyEmail', authroute.varifyEmail);
	//app.post('/confirmAccountForgot', authroute.confirmOtpForgot);
	//app.post('/reSendOtp', authroute.reSendOtp);
	router.post('/login', authroute.login);
	router.post('/logOut', authroute.logOut);
	//app.post('/forgot-password', authroute.forgot);
	router.post('/resetPassword', authroute.resetPassword);
	router.post('/checkUniqueEmail', authroute.checkUniqueEmail);

	router.post('/admin/login',authroute.admin_login);
	app.use('/auth', router);
}
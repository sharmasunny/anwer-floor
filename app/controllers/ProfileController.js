const AppMessages = require('../../config/Message');
const CommonService = require('../services/CommonService');
const EmailService = require('../services/EmailService');
const JwtService = require('../services/JwTokenService');
const db = require('../../config/sequelize');
const Config = require('../../config/config');

module.exports = {

     /**--------------------------------------------------------------------------
     Function    : getUserProfileDetails
     Description : use to get profiledetails
     --------------------------------------------------------------------------*/

    getUserProfileDetails : function (req, res) {
    	let userid = req.params.id;
    	db.Profile.findAll({where: {Userid:userid }, include:[{model:db.User,attributes:['firstname']}] })
		.then(function(resData){
        	if(!resData) {
        		return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
        	}else {
				return res.json({resStatus:'success', msg : 'Profile Listing', result : resData});     
        	}
	    }).catch(function(err){
	       return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR ,err:err});
		}); 
    }
}
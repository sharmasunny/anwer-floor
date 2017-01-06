const AppMessages = require('../../config/Message');
const CommonService = require('../services/CommonService');
const EmailService = require('../services/EmailService');
const JwtService = require('../services/JwTokenService');
const db = require('../../config/sequelize');
const Config = require('../../config/config');



module.exports = {

    /**--------------------------------------------------------------------------
    Function    : getAllEnquiries
    Description : use to get profiledetails
    --------------------------------------------------------------------------*/

    getAllEnquiries: function(req, res) {
        db.Enquiry.findAll({ include: [{ model: db.Profile, include :[db.User] }]   })
            .then(function(resData) {
                if (!resData) {
                    return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                } else {
                    return res.json({ resStatus: 'success', msg: 'Enquiries Listing', result: resData });
                }
            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
            });
    },


    /**--------------------------------------------------------------------------
    Function    : getProfileId
    Description : use to get profileId
    --------------------------------------------------------------------------*/

    getProfileId: function(req, res) {
        let userid = req.params.id;
        db.Profile.findAll({ where: { Userid: userid } })
            .then(function(resData) {
                if (!resData) {
                    return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                } else {
                    return res.json({ resStatus: 'success', msg: 'Profile Listing', result: resData });
                }
            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
            });
    },


    /**--------------------------------------------------------------------------
    Function    : createEnquiry
    Description : use to create enquiry
    --------------------------------------------------------------------------*/

    createEnquiry: function(req, res) {
        let item = req.body;
        db.Enquiry.create(item)
            .then(function(enquiry) {
                return res.json({ resStatus: 'success', msg: "Enquiry Created", result: enquiry });
            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR ,err:err});
            });
    },


}

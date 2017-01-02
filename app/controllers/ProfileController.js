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

    getUserProfileDetails: function(req, res) {
        let userid = req.params.id;
        db.Profile.findAll({ where: { Userid: userid }, include: [{ model: db.User, attributes: ['firstname'] }] })
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
    Function    : createProfile
    Description : use to create Profile
    --------------------------------------------------------------------------*/

    createProfile: function(req, res) {
        let item = req.body;
        db.Profile.create(item)
            .then(function(profile) {
                return res.json({ resStatus: 'success', msg: "Profile Created", result: profile });

            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
            });
    },

    /**--------------------------------------------------------------------------
    Function    : uploadImage
    Description : use to Upload Image
    --------------------------------------------------------------------------*/


    uploadImage: function(req, res) {
        res.json({ filename: req.file.filename });
    },


    /**--------------------------------------------------------------------------
    Function    : updateProfile
    Description : use to Update Profile
    --------------------------------------------------------------------------*/

    updateProfile: function(req, res) {
        let id = req.params.id;
        db.Profile.update(req.body, { where: { id: id } }).then(function(resData) {
            if (!resData) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
            } else {
                return res.json({ resStatus: 'success', msg: 'Update Profile', result: resData });
            }
        }).catch(function(err) {
            return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
        });

    }

}

const AppMessages = require('../../config/Message');
const CommonService = require('../services/CommonService');
const EmailService = require('../services/EmailService');
const JwtService = require('../services/JwTokenService');
const db = require('../../config/sequelize');
const Config = require('../../config/config');
const _ = require('lodash');

module.exports = {

    /**--------------------------------------------------------------------------
    Function    : createAddressBook
    Description : save addressBook details
    --------------------------------------------------------------------------*/

    createAddressBook: function(req, res) {
        let item = req.body;
        db.Addressbook.create(item)
            .then(function(addressBook) {
                return res.json({ resStatus: 'success', msg: "Save Address Book", result: addressBook });

            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
            });
    },

    getOneAddressBook: function(req, res) {
        let id = req.params.id;
        db.Addressbook.findAll({ where: { id: id } })
            .then(function(resData) {
                if (!resData) {
                    return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                } else {
                    return res.json({ resStatus: 'success', msg: 'Address book Listing', result: resData });
                }
            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
            });
    },

    getAllAddressBook: function(req, res) {
        let userid = req.params.id;
        db.Addressbook.findAll({ where: { Userid: userid ,'isDeleted': false}, order: ' name ASC' })
            .then(function(resData) {
                if (!resData) {
                    return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                } else {
                    return res.json({ resStatus: 'success', msg: 'All Address book Listing', result: resData });
                }
            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
            });
    },

    updateAddressBook: function(req, res) {
        let id = req.params.id;
        db.Addressbook.update(req.body, { where: { id: id } }).then(function(resData) {
            if (!resData) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
            } else {
                return res.json({ resStatus: 'success', msg: 'Update Address book', result: resData });
            }
        }).catch(function(err) {
            return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
        });
    },


    deleteAddressBook: function(req, res) {
        let id = req.params.id;
        db.Addressbook.update({'isDeleted':true}, { where: { id: id } }).then(function(resData) {
            if (!resData) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
            } else {
                return res.json({ resStatus: 'success', msg: 'Delete Address book', result: resData });
            }
        }).catch(function(err) {
            return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
        });
    },

    getContact: function(req, res){
        console.log(req.body);
        res.json(req.body);
    }
}

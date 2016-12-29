const AppMessages = require('../../config/Message');
const CommonService = require('../services/CommonService');
const EmailService = require('../services/EmailService');
const JwtService = require('../services/JwTokenService');
const db = require('../../config/sequelize');
const Config = require('../../config/config');
const _ = require('lodash');
const request = require('request');
const parser = require('xml2json');
const async = require('async');

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
            db.Addressbook.findAll({ where: { Userid: userid, 'isDeleted': false }, order: ' name ASC' })
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
            db.Addressbook.update({ 'isDeleted': true }, { where: { id: id } }).then(function(resData) {
                if (!resData) {
                    return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                } else {
                    return res.json({ resStatus: 'success', msg: 'Delete Address book', result: resData });
                }
            }).catch(function(err) {
                return res.json({ resStatus: 'error', msg: AppMessages.SERVER_ERR, err: err });
            });
        },

        googleAddressBook: function(req, res) {
            let accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
            let peopleApiUrl = 'https://www.google.com/m8/feeds/contacts/default/full';
            let userId = req.body.userIDdata;
            let params = {
                code: req.body.code,
                client_id: req.body.clientId,
                client_secret: Config.google.clientSecret,
                redirect_uri: req.body.redirectUri,
                grant_type: 'authorization_code'
            };

            function retrivedInfo(err, response, profile) {
                if (profile.error) {
                    return res.status(500).send({ message: profile.error.message });
                }

                let contacts = [];

                if (profile.feed.entry != undefined) {
                    let data = profile.feed.entry;

                    _.forEach(data, function(val, key) {
                        let item = {};
                        item.UserId = userId;
                        if (val['title']) {
                            item.name = (val['title']['$t'] ? val['title']['$t'] : '');
                        } else {
                            item.name = '';
                        }

                        if (val['gd$email'] != undefined) {
                            item.email = (val['gd$email'][0]['address'] ? val['gd$email'][0]['address'] : '');
                        } else {
                            item.email = '';
                        }

                        if (val['gd$phoneNumber'] != undefined) {
                            item.phone = (val['gd$phoneNumber'][0]['$t'] ? val['gd$phoneNumber'][0]['$t'] : '');
                        } else {
                            item.phone = '';
                        }

                        contacts.push(item);
                    });
                }



                async.forEach(contacts, function(item, callback) {
                            if(item.name!=null && item.name!=''){
                                db.Addressbook.findAll({ where: { name:item.name }})
                                .then(function(resData) {
                                    if(!resData){
                                        db.Addressbook.create(item)
                                            .then(function(addressBook) {
                                                console.log(addressBook);
                                            }).catch(function(err) {
                                                console.log(err);
                                            });
                                    }
                                 }).catch(function(err) {
                                    console.log(err);
                                });
                            }
                                
                            callback();
                    },
                    function(err) {
                        if (err) {
                            console.log('A file failed to process');
                        } else {
                            console.log('All files have been processed successfully');
                        }
                    });

                res.json({ success: 'google contact successfully import' });
            
        }


        function getAccessToken(err, response, token) {

            let accessToken = token.access_token;
            let headers = { Authorization: 'Bearer ' + accessToken };

            let url = peopleApiUrl + '?access_token="' + accessToken + '"&alt=json';

            request.get({ url: url, headers: headers, json: true }, retrivedInfo);

        }

        request.post(accessTokenUrl, { json: true, form: params }, getAccessToken);
    },

    saveActivity: function(req, res) {
        
    }
}

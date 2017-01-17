const AppMessages = require('../../config/Message');
const CommonService = require('../services/CommonService');
const EmailService = require('../services/EmailService');
const db = require('../../config/sequelize');
const Config = require('../../config/config');
const async = require('async');

module.exports = {

    sendMessage: function(req, res) {
        let item = req.body;
        sendMessageCallback(item, function(data) {
            res.json(data);
        });

    },
    getAllMessage: function(req, res) {
        let userID = req.params.id;
        getAllMessageCallback(userID, function(data) {
            res.json(data);
        });

    }
}


function getAllMessageCallback(userID, cb) {

    db.sequelize.query("SELECT u.id , u.id as UserId,c.id as conversationId, c.userOneId, c.userTwoId ,u.firstname,u.lastname,u.email FROM Conversations as c, Users as u WHERE CASE  WHEN c.userOneId = " + userID + " THEN c.userTwoId = u.id WHEN c.userTwoId = " + userID + " THEN c.userOneId= u.id END  AND ( c.userOneId =" + userID + " OR c.userTwoId =" + userID + " ) Order by c.id DESC", { type: db.sequelize.QueryTypes.SELECT })
        .then(function(resData) {
            if (Object.keys(resData).length > 0) {
                if (Object.keys(resData).length == 1) {
                    let conversation = resData;
                    conversation[0].ConversationMessage = [];
                    db.ConversationMessage.findAll({ where: { ConversationId: conversation[0].conversationId } })
                        .then(function(ConversationMessageData) {
                            if (Object.keys(ConversationMessageData).length > 0) {
                                conversation[0].ConversationMessage = ConversationMessageData;
                            }
                            cb({ resStatus: 'success', result: conversation });
                        }).catch(function(err) {
                            cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                        });
                } else {
                    let Conversation = resData;
                    async.forEach(Conversation, function(item, callback) {
                            db.ConversationMessage.findAll({ where: { ConversationId: item.conversationId } })
                                .then(function(ConversationMessageData) {
                                    item.ConversationMessage = ConversationMessageData;
                                    callback();
                                }).catch(function(err) {
                                    console.log(err);
                                    callback();
                                });
                        },
                        function(err) {
                            if (err) {
                                cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                            } else {
                                cb({ resStatus: 'success', result: Conversation });
                            }
                        });
                }
            } else {
                cb({ resStatus: 'success', msg: 'No message found', result: resData });
            }
        }).catch(function(err) {
            cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
        });

}


function sendMessageCallback(item, cb) {
    db.Conversation.findAll({
        where: {
            $or: [{
                $and: [{
                    userOneId: item.sender
                }, {
                    userTwoId: item.receiver
                }]
            }, {
                $and: [{
                    userOneId: item.receiver
                }, {
                    userTwoId: item.sender
                }]
            }]
        },
        attributes: ['id']
    }).then(function(resData) {
        if (Object.keys(resData).length <= 0) {
            let data = {};
            data.userOneId = item.sender;
            data.userTwoId = item.receiver;
            db.Conversation.create(data)
                .then(function(createRes) {
                    let data = {};
                    data.ConversationId = createRes.id;
                    data.message = item.message;
                    data.UserId = item.sender;
                    db.ConversationMessage.create(data)
                        .then(function(createRes) {
                            cb({ resStatus: 'success', result: createRes });
                        }).catch(function(err) {
                            cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                        });

                }).catch(function(err) {
                    cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                });
        } else {
            let data = {};
            data.ConversationId = resData[0].id;
            data.message = item.message;
            data.UserId = item.sender;
            db.ConversationMessage.create(data)
                .then(function(createRes) {
                    cb({ resStatus: 'success', result: createRes });

                }).catch(function(err) {
                    cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
                });
        }
    }).catch(function(err) {
        cb({ resStatus: 'error', msg: AppMessages.SERVER_ERR });
    });
}

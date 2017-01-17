'use strict';

module.exports = function(sequelize, DataTypes) {

    var Conversation = sequelize.define('Conversation', {}, {
        associate: function(models) {
            Conversation.hasMany(models.ConversationMessage);
            Conversation.belongsTo(models.User, { as: 'userOne' });
            Conversation.belongsTo(models.User, { as: 'userTwo' });
        }
    });

    return Conversation;

};

'use strict';

module.exports = function(sequelize, DataTypes) {

    var ConversationMessage = sequelize.define('ConversationMessage', {
        message: DataTypes.TEXT,
        status: {
            type: DataTypes.ENUM,
            values: ['read', 'unread', 'delete'],
            defaultValue: 'unread'
        }
    }, {
        associate: function(models) {
            ConversationMessage.belongsTo(models.User);
            ConversationMessage.belongsTo(models.Conversation);
        }
    });

    return ConversationMessage;
};

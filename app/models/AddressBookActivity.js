'use strict';

module.exports = function(sequelize, DataTypes) {

	var AddressbookActivity = sequelize.define('AddressbookActivity', {
		activity : DataTypes.STRING,
		content : DataTypes.TEXT
	},
	{
		associate: function(models){
			AddressbookActivity.belongsTo(models.Addressbook);
		}
	});

	return AddressbookActivity;
};

'use strict';

module.exports = function(sequelize, DataTypes) {

	var AddressbookActivity = sequelize.define('AddressbookActivity', {
		name : DataTypes.STRING,
		content : DataTypes.TEXT
	},
	{
		associate: function(models){
			AddressbookActivity.belongsTo(models.Addressbook);
		}
	});

	return AddressbookActivity;
};

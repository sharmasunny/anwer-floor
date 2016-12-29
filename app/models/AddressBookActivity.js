'use strict';

module.exports = function(sequelize, DataTypes) {

	var AddressbookActivity = sequelize.define('AddressbookActivity', {
		name : DataTypes.STRING
	},
	{
		associate: function(models){
			AddressbookActivity.belongsTo(models.Addressbook);
		}
	});

	return AddressbookActivity;
};

'use strict';

module.exports = function(sequelize, DataTypes) {

	var Addressbook = sequelize.define('Addressbook', {
		name : DataTypes.STRING,
		category : DataTypes.STRING,
		email: DataTypes.STRING,
		address: DataTypes.STRING,
		phone: DataTypes.STRING,
		dob: DataTypes.STRING,
		isDeleted: {
	        type: DataTypes.BOOLEAN,
	        values : [true, false],
	        defaultValue: false
	    }
	},
	{
		associate: function(models){
			Addressbook.belongsTo(models.User);
			Addressbook.hasMany(models.AddressbookActivity);
		}
	});

	return Addressbook;
};

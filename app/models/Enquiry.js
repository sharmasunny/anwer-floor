'use strict';

module.exports = function(sequelize, DataTypes) {

	var Enquiry = sequelize.define('Enquiry', {
		enquiry: DataTypes.STRING,
		language: DataTypes.STRING,
		description: DataTypes.TEXT,
	    rate: DataTypes.INTEGER,
	},
	{
			associate: function(models){
				Enquiry.belongsTo(models.Profile);
			}
		}
	);

	return Enquiry;
};

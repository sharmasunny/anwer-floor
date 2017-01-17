'use strict';

module.exports = function(sequelize, DataTypes) {

	var Enquiry = sequelize.define('Enquiry', {
		title:DataTypes.STRING,
		language: DataTypes.STRING,
		display_name: DataTypes.STRING,
		description: DataTypes.TEXT,
	    medium:DataTypes.INTEGER,
	    location:DataTypes.STRING,
	    currency_type:DataTypes.STRING,
	    rate: DataTypes.INTEGER
	},
	{
			associate: function(models){
				Enquiry.belongsTo(models.User);
			}
		}
	);

	return Enquiry;
};

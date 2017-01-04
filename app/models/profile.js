'use strict';

module.exports = function(sequelize, DataTypes) {

	var Profile = sequelize.define('Profile', {
		title: DataTypes.STRING,
		category: DataTypes.STRING,
	    education: DataTypes.STRING,
	    Languages_known: DataTypes.STRING,
	    skill: DataTypes.STRING,
	    interests: DataTypes.STRING,
	    reviews: DataTypes.STRING,
	    city: DataTypes.STRING,
	    points: DataTypes.INTEGER,
	    designition: DataTypes.STRING,
	    share: DataTypes.STRING,
	},
	{
			associate: function(models){
				Profile.belongsTo(models.User);
				Profile.belongsTo(models.MembershipPlan);
			}
		}
	);

	return Profile;
};

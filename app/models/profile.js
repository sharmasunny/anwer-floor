'use strict';

module.exports = function(sequelize, DataTypes) {

	var Profile = sequelize.define('Profile', {
		info: DataTypes.TEXT,
		category: DataTypes.STRING,
	    education: DataTypes.STRING,
	    languages: DataTypes.STRING,
	    skills: DataTypes.STRING,
	    interests: DataTypes.STRING,
	    reviews: DataTypes.STRING,
	    location: DataTypes.STRING,
	    points: DataTypes.INTEGER,
	    rate: DataTypes.INTEGER,
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

'use strict';

module.exports = function(sequelize, DataTypes) {

	var MembershipPlan = sequelize.define('MembershipPlan', {
		plan_title : DataTypes.STRING,
		price : DataTypes.STRING,
		Description: DataTypes.STRING
	},
	{
		associate: function(models){
				MembershipPlan.hasMany(models.Profile);
		}
	});

	return MembershipPlan;
};

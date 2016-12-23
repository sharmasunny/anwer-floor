'use strict';

/**
	* Profile Model
	*/

var crypto = require('crypto');
//var User = require('./user');

module.exports = function(sequelize, DataTypes) {
	var Profile = sequelize.define('Profile', {	
	    id: {
	        type: DataTypes.INTEGER,
	        primaryKey: true
	    },
	    user_id: {
	    	type: DataTypes.INTEGER,
	        references: { model: 'Users', key: "id" },
	    },
	    title: DataTypes.STRING,
	    education: DataTypes.STRING,
	    Languages_known: DataTypes.STRING,
	    skill: DataTypes.STRING,
	    interests: DataTypes.STRING,
	    reviews: DataTypes.STRING,
	    city: DataTypes.STRING,
	    points: DataTypes.INTEGER,
	    designition: DataTypes.STRING,
	    share: DataTypes.STRING, 
	}, {
            tableName: 'Profile',
            classMethods: {
                associate: function (models) {
                    ProfileProfile.belongsTo(models.user, {
                        foreignKey: {
                            name: 'user_id',
                            allowedNull: false,    
                        }
                    })
                }
            }
        })
    return Profile
}


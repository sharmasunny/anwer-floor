'use strict';

/**
	* User Model
	*/

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', 
		{
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			phone:DataTypes.STRING,
			email: DataTypes.STRING,
			image:DataTypes.STRING,
			hashedPassword: DataTypes.STRING,
			provider: DataTypes.STRING,
			salt: DataTypes.STRING, 
			facebookUserId: DataTypes.INTEGER,
			twitterUserId: DataTypes.INTEGER,
			twitterKey: DataTypes.STRING,
			twitterSecret: DataTypes.STRING,
			github: DataTypes.STRING,
			openId: DataTypes.STRING,
			isOnline:DataTypes.STRING,
	        verificationEmail: {
	            type: DataTypes.BOOLEAN,
	            values : [true, false],
	            defaultValue : false,
	        },     
			role: {
          		type: DataTypes.ENUM,
        		values: ['USER', 'ADMIN'],
          		defaultValue:'USER'
     		},
     		deviceToken : DataTypes.STRING,
	        platform : {
	            type: DataTypes.ENUM,
	            values : ['ANDROID', 'IOS', 'WEB'],
	            default : 'WEB'
	        },
		    otp: DataTypes.STRING,
		    token: DataTypes.STRING,
		    status: {
		        type: DataTypes.BOOLEAN,
		        values : [true, false],
		        defaultValue:false
		    },
		    isDeleted: {
		        type: DataTypes.BOOLEAN,
		        values : [true, false],
		        defaultValue: false
		    },
		},
		{
			instanceMethods: {
				toJSON: function () {
					var values = this.get();
					delete values.hashedPassword;
					delete values.salt;
					return values;
				},
				makeSalt: function() {
					return crypto.randomBytes(16).toString('base64'); 
				},
				authenticate: function(plainText){
					return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
				},
				encryptPassword: function(password, salt) {
					if (!password || !salt) {
                        return '';
                    }
					salt = new Buffer(salt, 'base64');
					return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
				}
			},
			associate: function(models) {
				User.hasMany(models.Profile);
				User.hasMany(models.Addressbook);
			}
		}
	);

	return User;
};

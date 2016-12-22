const db = require('../../config/sequelize');

var serviceObj = module.exports = {

     generateOtp : function (num) {
          let text = "";
          let possible = "0123456789";
          for( let i = 0; i < num; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
     },

     getTemplate : function (referenceId, callback) {
          if(referenceId=='VERIFY-EMAIL'){
               subject = 'VERIFY EMAIL';
               TEMPLATE = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\"><tbody><tr><td style=\"background-color:#fff\">&nbsp;<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:600px\"><tbody><tr><td style=\"background-color:#EBF8A4\"><table align=\"center\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" style=\"width:100%\"><tbody><tr><td>New Account</td></tr></tbody></table></td></tr><tr><td><table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" style=\"width:100%\"><tbody><tr><td style=\"background-color:#fff\"><table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" style=\"width:100%\"><tbody><tr><td><p>Dear&nbsp; {{USERNAME}},</p><p>Please confirm your registration here <a  target=_blank href='{{URL}}'>Confirm your email</a></p></td></tr></tbody></table><table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" style=\"width:100%\"><tbody><tr><td><pre>Thanks and Regards:<br><strong> Answer floor </strong></pre><p></p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style=\"background-color:#EBF8A4\">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>";
          }
          callback(null,{subject:subject,description:TEMPLATE});
     },

     generateRandom:function(num){
          let text = "";
          possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for( let i=0; i < num; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
     },

     isEmailExist : function(newEmail, cb) {
          let status = "ERR";
          db.User.findOne({ where: { email: newEmail }}).then(function(user) {
               if(user != null) {
                    status =  true;
               } else {
                    status = false;
               }
               cb(status);
          });    
     },

     isGoogleIdExist : function(googleId, UserModel, cb) {
          let status;
          UserModel.findOne ({googleId : googleId}, function (err, res) {
               if(res != null) {
                    status =  true;
               } else {
                    status = false;
               }
               cb(status);
          });
     },

     isFacebookIdExist : function(facebookId, UserModel, cb) {
          let status;
          UserModel.findOne ({facebookId : facebookId}, function (err, res) {
               if(res != null) {
                    status =  true;
               } else {
                    status = false;
               }
               cb(status);
          });
     },

     isMobileVerificationDone : function(userId, cb) {
          let UserModel = require(APP_PATH + '/api/models/UserModel.js');
          UserModel.findOne ( {_id : userId , "mobile" : { $ne : ""}, "otp" : null}, function (err, res) {
               if(err) {
                    cb("err", null);
               }else if(res != null) {
                    cb(null,true);
               } else {
                    cb(null,false);
               }
          });
     },

     isLicenseVerificationDone : function(userId, cb) {
          let UserModel = require(APP_PATH + '/api/models/UserModel.js');
          UserModel.findOne ( {_id : userId , "license.name" : { $exists : true, $ne : ""}}, function (err, res) {
               if(err) {
                    cb(true, null);
               }else if(res != null) {
                    cb(null,true);
               } else {
                    cb(null,false);
               }
          });
     },

     getUserTransactions : function(model, userId, cb) {
          model.find ( {userId : userId} , function (err, res) {
               if(err) {
                    cb("err", null);
               }else {
                    cb(null,res);
               }
          });
     },

     /**--------------------------------------------------------------------------
     Function    : sendPushNotification
     Description : send push notification
     --------------------------------------------------------------------------*/
     pushNotification (notifyObj, io, callback) {
          var FCM = require('fcm-node');
          var serverKey = ENV_OBJ.FCM.SERVERKEY;
          var fcm = new FCM(serverKey);

          UserModel.findOne({ "_id" : notifyObj.to} ,{fcm : 1, name : 1}, {"upsert" : false, "new":true}).exec(function (err, resData) {
               if(err) callback (true, null);
               if(!resData) {
                    callback (true, null);
               } else {

                    if(resData.fcm && resData.fcm.platform != 'WEB') {
                         ChatModel
                         .findOne(
                              {_id : notifyObj._id}
                         )
                         .populate (
                              {
                                   'path' : 'to from',
                                   'select' : 'name profile fcm'
                              }
                         )
                         .exec(function (err, data) {
                              if(err) callback (true, null);
                              if(data) {
                                   var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                        to : resData.fcm.deviceToken,
                                        //collapse_key: 'your_collapse_key',

                                        notification: {
                                             title: resData.fullname,
                                             body: notifyObj.message
                                        },

                                        data: {  //you can send only notification or only data(or include both)
                                             title : resData.fullname,
                                             message: notifyObj.message,
                                             userId : notifyObj.from,
                                             fromId : notifyObj.from,
                                             toId : notifyObj.to,
                                             action : 'PUSH',
                                             jsonData : data
                                        }
                                   };
                                   fcm.send(message, function(err, response){
                                        //console.log("==============", JSON.parse(err));
                                        if (JSON.parse(err) && JSON.parse(err).failure == 1) {
                                             //console.log(JSON.parse(err));
                                             callback ( true, null );
                                             //console.log("Something has gone wrong!");

                                        } else {

                                             callback ( null, data );
                                             console.log("Successfully sent with response: ", response);
                                        }
                                   });
                              }
                         });
                    } else {
                         ChatModel
                         .findOne(
                              {_id : notifyObj._id}
                         )
                         .populate (
                              {
                                   'path' : 'to from',
                                   'select' : 'name profile fcm'
                              }
                         )
                         .exec(function (err, data) {
                              if (err) {
                                   callback ( true, null );
                              } else {
                                   callback ( null, data);
                              }

                         });

                    }
               }
          });
     },

     sendEmailForBooking (userId, startDate, endDate) {
          /** Notify User For Booking */
          UserModel
          .findOne(
               {
                    _id : userId
               },
               {
                    'email' : 1,
                    'name' : 1

               }
          )
          .exec(
               function (err, userInfo) {

                    if (err) {
                         Winstonlogger.log('error', 'Email Not Sent to '+ userId, { error : err });
                    } else {
                         if(userInfo) {
                              let moment = require('moment');
                              let template = serviceObj.getTemplate("BOOKING-CONFIRMATION",function(err,data){

                                   let URL = 'http://localhost:3000/#/user/order';
                                   let STARTDATE = moment(startDate).format('MM/DD/YYYY h:mm a')
                                   let ENDDATE =moment(endDate).format('MM/DD/YYYY h:mm a');

                                   data.description =  data.description.replace("{{USERNAME}}", userInfo.fullname);
                                   data.description =  data.description.replace("{{STARTDATE}}", STARTDATE);
                                   data.description =  data.description.replace("{{ENDDATE}}", ENDDATE);
                                   data.description =  data.description.replace("{{URL}}",URL);
                                   let mailOptions = {
                                        from: AppConstants.EMAIL,
                                        to:  [userInfo.email],
                                        subject: data.subject,
                                        html: data.description
                                   }
                                   EmailService.send(mailOptions,function(err, response){
                                        if(err) {
                                             console.log("Email Not Sent");
                                        } else {
                                             console.log("Email Sent Succesfully");
                                        }
                                   });
                              });
                         }
                    }
               }
          )
     }


};

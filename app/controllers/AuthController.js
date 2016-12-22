
const AppMessages = require('../../config/Message');
const CommonService = require('../services/CommonService');
const EmailService = require('../services/EmailService');
const JwtService = require('../services/JwTokenService');
const db = require('../../config/sequelize');
module.exports = {

     /**--------------------------------------------------------------------------
     Function    : register
     Description : use to register a user
     --------------------------------------------------------------------------*/
     register: function (req, res) {
          
     
          if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
               return res.json({resStatus:'error', msg :'Please fill all required fields'});
          }

          CommonService.isEmailExist(req.body.email, function (emailStatus) {

               if (emailStatus === false) {
                    let user = db.User.build(req.body);
                    let OTP = CommonService.generateOtp(6);
                    let TOKEN = CommonService.generateRandom(10)+(new Date()).getTime() + CommonService.generateRandom(6);
                    user.otp = OTP;
                    user.token = TOKEN;
                    user.platform = req.body.platform || 'WEB';
                    user.deviceToken = req.body.deviceToken || '';
                    user.provider = 'local';
                    user.salt = user.makeSalt();
                    user.hashedPassword = user.encryptPassword(req.body.password, user.salt);

                    
        
                        

                    user.save().then(function (resData) {
                         
                         CommonService.getTemplate("VERIFY-EMAIL",function(err,data){
                              data.description = data.description.replace("{{USERNAME}}", resData.firstname+' '+resData.lastname);
                              
                              let URL = 'http://localhost:3000/verifyEmail?token='+resData.token;
                              
                              data.description = data.description.replace("{{URL}}", URL);

                              let mailOptions = {
                                        from: 'codingcarttechnologies@gmail.com',
                                        to: resData.email,
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

                         
                         return res.json({resStatus:'success', msg :AppMessages.LOGIN,  token: JwtService.issueToken(resData.id,resData.platform, resData.deviceToken),result: resData});
                        
               }).catch(function (err) {
                    res.json({resStatus:'error', msg : AppMessages.SERVER_ERR});
               });


               } else {
                    return res.json({resStatus:'error', msg : AppMessages.DUPLICATE_ACCOUNT});
               }
          });
     },

     /**--------------------------------------------------------------------------
     | Function    : confirmOtp
     | Description : use to confirm account after register of user
     |--------------------------------------------------------------------------*/
     confirmOtp: function (req, res) {
          let otp = req.body.otp;
          let reqId = req.body.id;

          db.User.findOne({ where: { "id" : reqId, "otp" : otp}}).then(function(user) {
              if(user) {
                    db.User.update({"status" : true, "otp" : null }, { where: { id: user.id } }).then(function(resData) {
                         return res.json({resStatus:'success', msg :AppMessages.ACCOUNT_CREATION,  token: JwtService.issueToken(resData.id),result: resData});
                    }).catch(function (err) {
                         return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
                    });
               } else {
                    return res.json({resStatus:'error', msg :AppMessages.INVALID_OTP});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          });
     },
     /**--------------------------------------------------------------------------
     | Function    : confirmOtp
     | Description : use to confirm account after register of user
     |--------------------------------------------------------------------------*/
     varifyEmail: function (req, res) {
          let authtoken = req.body.token;
          
          db.User.findOne({ where: {"token" : authtoken}}).then(function(user) {
              if(user) {
                    user.verificationEmail = true;
                    user.status = true;
                    user.token = '';
                    db.User.update({"verificationEmail" : true, "status" : true, "token" : '' }, { where: { id: user.id } }).then(function(resData) {
                         if(resData){
                              return res.json({resStatus:'success', msg : "Your Email Account has been successfully verified.", token: JwtService.issueToken(resData.id), result: user});
                         }else{
                              return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
                         }
                    }).catch(function (err) {
                         return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
                    });
               } else {
                    return res.json({resStatus:'error', msg : 'You have already used this token'});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          });

     },

     /**--------------------------------------------------------------------------
     | Function    : reSendOtp
     | Description : use to resend OTP in case of OTP not received
     |--------------------------------------------------------------------------*/
     // reSendOtp: function (req, res) {
     //      let reqId = req.body._id;
     //      let OTP = CommonService.generateOtp(6);
     //      UserModel.findOneAndUpdate({ _id : reqId},{otp : OTP, status:true },function (err, resData) {
     //           if(err) return res.json({resStatus:'error', msg : AppMessages.SERVER_ERR});
     //           if(resData == null) {
     //                return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
     //           } else {
     //                CommonService.getTemplate("RESEND-OTP",function(err,templateData){
     //                     let template = templateData.description;
     //                     template = template.replace("{{USERNAME}}", resData.fullname);
     //                     template = template.replace("{{OTP}}", OTP);
     //                     let body = template;
     //                     mailOptions = {
     //                          from: AppConstants.EMAIL,
     //                          to:  [resData.email],
     //                          subject: templateData.subject,
     //                          html: template
     //                     }
     //                     EmailService.send(mailOptions,function(err, response){
     //                          if(err) {
     //                               //console.log("Email Not Sent ======",err);
     //                          } else {
     //                               //console.log("Email Sent Succesfully ======",response);
     //                          }
     //                     });
     //                     return res.json({resStatus:'success', msg : AppMessages.DUPLICATE_OTP});
     //                });

     //           }
     //      });
     // },

     /**--------------------------------------------------------------------------
     | Function    : register
     | Description : use to recover password in case of forgot password
     |--------------------------------------------------------------------------*/
     // forgot: function (req, res) {
     //      //console.log("========"); return;
     //      let email = req.body.email;
     //      if (!email) {
     //           return res.json({resStatus:'error', msg :'Email is required', fieldEmpty:"email"});
     //      }
     //      UserModel.findOne({ "isDeleted" :false, "email" : email, "role" : 'USER' },function (err, resData) {
     //           if(err) return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
     //           if(resData == null) {
     //                return res.json({resStatus:'error', msg :AppMessages.ACCOUNT_INVALID});
     //           } else {
     //                let OTP = CommonService.generateOtp(6);
     //                CommonService.getTemplate("FORGOT-PASSWORD",function(err,templateData){
     //                     let template = templateData.description;
     //                     template = template.replace("{{USERNAME}}", resData.fullname);
     //                     template = template.replace("{{OTP}}", OTP);
     //                     let mailOptions = {
     //                          from: AppConstants.EMAIL,
     //                          to: [email],
     //                          subject: template.subject,
     //                          html: template
     //                     }
     //                     UserModel.findOneAndUpdate({email : email},{otp : OTP}, {new : true},function(err, resData){
     //                          if (err) return res.json({resStatus:'error', msg : AppMessages.SERVER_ERR});
     //                          if(resData != null) {
     //                               EmailService.send(mailOptions,function(err, response){
     //                                    if(err) {
     //                                         // Error Code Goes Here
     //                                         console.log("Some Error Occured While sending Email");
     //                                    } else {
     //                                         console.log("Email Sent Successfully");
     //                                    }
     //                               });
     //                               return res.json({resStatus : 'success', msg : AppMessages.FORGOT_OTP, _id : resData._id});
     //                          } else {
     //                               return res.json({resStatus : 'error', msg : AppMessages.SERVER_ERR});
     //                          }
     //                     });
     //                });
     //           }
     //      });
     // },

     /**--------------------------------------------------------------------------
     | Function    : confirmOtpForgot
     | Description : use to confirm account in case of forgot password
     |--------------------------------------------------------------------------*/
     // confirmOtpForgot: function (req, res) {
     //      let otp = req.body.otp;
     //      let reqId = req.body._id;
     //      UserModel.findOneAndUpdate({ _id:reqId, otp: otp} ,{status:true, otp:null }, {new:true}).exec(function (err, resData) {
     //           if(err) return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
     //           if(resData == null) {
     //                return res.json({resStatus:'error', msg :AppMessages.INVALID_OTP});
     //           } else {
     //                return res.json({resStatus:'success', msg :AppMessages.ACCOUNT_RECOVER, _id:resData._id});
     //           }
     //      });
     // },

     /**--------------------------------------------------------------------------
     | Function    : login
     | Description : use to login user
     |--------------------------------------------------------------------------*/
     login: function (req, res) {
          var email = req.body.email;

          var password = req.body.password;

          if (!password) {
               return res.json({resStatus:'error', msg :'Password is required'});
          }

          if (!email) {
               return res.json({resStatus:'error', msg :'Email is Required'});
          }

          req.body.platform = req.body.platform || 'WEB';
          req.body.deviceToken = req.body.deviceToken || '';

          db.User.findOne({ where: {isDeleted:false, email:email,'role' : 'USER'}}).then(function(user) {
               if (!user) {
                    return res.json({resStatus:'error', msg :'Invalid Email or Password', fieldEmpty:"email_pass"});
               }else if (!user.authenticate(password)) {
                    return res.json( {resStatus:'error', msg :'Invalid Email or Password', fieldEmpty:"password"});
               } else {
                    return res.json({resStatus:'success', msg :AppMessages.LOGIN,  token: JwtService.issueToken(user.id, req.body.platform, req.body.deviceToken),result: user});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          });
     },

     /**--------------------------------------------------------------------------
     | Function    : login
     | Description : use to login user
     |--------------------------------------------------------------------------*/
     logOut: function (req, res) {
          db.User.update({isOnline : 'N', 'platform' :  '', 'deviceToken' : '' }, { where: { id: req.body.id } }).then(function(resData) {
               res.json({resStatus:'success', msg : "User has been logged Out successfully"});
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          });
     },

     /**--------------------------------------------------------------------------
     | Function    : resetPassword
     | Description : use to reset password
     |--------------------------------------------------------------------------*/
     resetPassword: function (req, res) {
          let reqId = req.body.id;
          let password = req.body.password;
          let con_password = req.body.con_password;

          if (!password) {
               return res.json({resStatus:'error', msg :'Password is required'});
          }

          if (!con_password) {
               return res.json({resStatus:'error', msg :'Confirm Password is required'});
          }

          if (password != con_password) {
               return res.json({resStatus:'error', msg :'Passwords do not match'});
          }
         

          db.User.findOne({ where: {"id" : reqId}}).then(function(user) {
              if(user) {
                    db.User.update({"password" : password, "platform" : "WEB"}, { where: { id: reqId } }).then(function(resData) {
                         if(resData){
                             return res.json({resStatus:'success', msg : AppMessages.PASSWORD_UPDATE});
                         }else{
                              return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
                         }
                    }).catch(function (err) {
                         return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
                    });
               } else {
                    return res.json({resStatus:'error', msg : 'You have already used this token'});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          });
     },

     /**--------------------------------------------------------------------------
     | Function    : checkUniqueEmail
     | Description : use to check unique email
     |--------------------------------------------------------------------------*/
     checkUniqueEmail: function (req, res) {
          let reqEmail = req.body.email;

          db.User.findOne({ where: { email: reqEmail }}).then(function(resData) {
               if(resData != null) {
                    return res.json({resStatus:'error', msg : AppMessages.DUPLICATE_EMAIL});
               }else {
                    return res.json({resStatus:'success', msg :AppMessages.EMAIL_AVAILAIBLE});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          }); 
     },

     /*--------------------------------------------------------------------------
     | Function    : checkUniqueEmail
     | Description : use to check unique mobile
     |--------------------------------------------------------------------------*/
     checkUniqueMobile: function (req, res) {
          let reqPhone = req.query.phone;

          db.User.findOne({ where: { phone : reqPhone }}).then(function(resData) {
               if(resData != null) {
                    return res.json({resStatus:'error', msg :AppMessages.DUPLICATE_MOBILE});
               }else {
                    return res.json({resStatus:'success', msg :AppMessages.MOBILE_AVAILABLE});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          }); 
     },

     /*** ***********************************************Admin API's ****************************************
     **********************************************************************************************************/

     /**--------------------------------------------------------------------------
     | Function    : login
     | Description : use to login user
     |--------------------------------------------------------------------------*/
     admin_login: function (req, res) {
          var email = req.body.email;

          var password = req.body.password;

          if (!password) {
               return res.json({resStatus:'error', msg :'Password is required'});
          }

          if (!email) {
               return res.json({resStatus:'error', msg :'Email is Required'});
          }




          db.User.findOne({ where: {isDeleted:false, email:email,role : 'ADMIN', status:true, otp:''}}).then(function(user) {
               if (!user) {
                    return res.json({resStatus:'error', msg :'Invalid Email or Password', fieldEmpty:"email_pass"});
               }else if (!user.authenticate(password)) {
                    return res.json( {resStatus:'error', msg :'Password is incorrect', fieldEmpty:"password"});
               } else {
                    return res.json({resStatus:'success', msg :AppMessages.LOGIN,  token: JwtService.issueToken(user.id),result: user});
               }
          }).catch(function (err) {
               return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
          });
     },

}

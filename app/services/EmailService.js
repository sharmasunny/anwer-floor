/*
Author :- Sunny chauhan
Purpose :- Service used to send email throughout the application
*/

let nodemailer = require('nodemailer');
let smtpConfig = {
     service : "gmail",
     auth    : {
          user:"ss40383@gmail.com",
          pass:"sunnyis007",
     }
};
let transporter = nodemailer.createTransport(smtpConfig);


module.exports = {
     send: function(mailOptions, cb) {

          transporter.sendMail(mailOptions, function(err, info){
               if(err){
                    return cb(err, null);
               }
               return cb(null, info);
          });
     },

     sendMultiple : function(toArr, mailOptions) {
          for (var index in toArr) {
               mailOptions.to = toArr[index]
               transporter.sendMail(mailOptions, function(err, info){
                    if(err){
                         console.log("Some Err Occured");
                    }
                    console.log("Successfull");
               });
          }
     }
};

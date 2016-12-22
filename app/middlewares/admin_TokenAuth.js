const jwToken = require('../services/JwTokenService');
const db = require('../../config/sequelize');

module.exports = function(req, res, next) {
     let token;
     if (req.headers && req.headers.authorization) {
          var parts = req.headers.authorization.split(' ');
          if (parts.length == 2) {
               var scheme = parts[0],
               credentials = parts[1];

               if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
               }
          } else {
               return res.json(400, {err: '400 Bad Request'});
          }
     } else if (req.param('token')) {
          token = req.param('token');
          //token = req.param('token');
          // We delete the token from param to not mess with blueprints
          delete req.query.token;
     } else {
          return res.json(403, {err:'ACCESS DENIED !! You are not authorize to access this Resource'});
          //return res.json(401, {err: 'ACCESS DENIED !! You are not authorize to access this Resource'});
          //return res.status(401, {err: 'No Authorization header was found'});
     }

     jwToken.verify(token, function(err, token) {
          if(token && token.auth) {
               db.User.findOne({ where: {id : token.auth}}).then(function(resData) {
                    if(resData) {
                         req.token = token;
                         next();
                    } else {
                         return res.status(403).json({resStatus : "error", msg:'Your session has been expired, please login.'});
                    }
               }).catch(function (err) {
                    return res.json({resStatus:'error', msg :AppMessages.SERVER_ERR});
               }); 
          } else {
               return res.status(401).json({resStatus : "error", msg: '400 Bad Request",'});
          }
     });
};

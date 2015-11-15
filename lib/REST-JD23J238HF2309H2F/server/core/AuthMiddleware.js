var jwt    = require('jsonwebtoken'),
    config = require('./../configs/AuthConfig'),
    Model  = require('./../libs/BaseModel')(config.model);

function AuthMiddleware(req, res, next) {
  var token = null;

  if (config.requestType.indexOf('body') > -1 && req.body[config.requestName])
    token = req.body[config.requestName];
  else if (config.requestType.indexOf('query') > -1 && req.query[config.requestName])
    token = req.query[config.requestName];
  else if (config.requestType.indexOf('header') > -1 && req.headers[config.requestName])
    token = req.headers[config.requestName];

  if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
          //redis.find("", function())
          return res.status(401).json({message: 'Failed to authenticate token.' });

        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).json({
          message: 'No token provided.'
      });
    }
}

function AuthCreator(req, res, next) {
  var query = config.query;
  Object.keys(query).forEach(function(k){
      if (query[k] = "###")
        query[k] = req.body[k];
  });

  Model.find(query, {})
    .exec(function (err, data) {
      var cfg  = {},
          user = {};

      if (err)
        return res.status(401).json({message : 'ewrwer'})

      if (config.timeout)
          cfg.expiresInMinutes = config.timeout;

      Object.keys(data).forEach(function(k){
          if (config.tokenFields.indexOf(k))
            user[k] = data[k]
      });

      var token = jwt.sign(user, config.secret, cfg);
      return res.status(200).json({
        token : token
      });
    });
}

module.exports = {
  verify : AuthMiddleware,
  create : AuthCreator
};

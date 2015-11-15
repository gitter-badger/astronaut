function BaseController(model) {
  var Model      = require('./BaseModel')(model),
      Controller = {};

  Controller.find = function(req, res, next) {
    var query = req.query ? req.query : {};

    if (query) {
        Object.keys(query).forEach(function (k) {
          query[k] = new RegExp(query[k], "gi");
        });
    }

    Model.find(query, {})
      .exec(res.handleJson);
  };

  Controller.findById = function(req, res, next) {
    Model.findOne({_id : req.params.id}, {})
      .exec(res.handleJson);
  };

  Controller.create = function(req, res, next) {
    Model.create(req.body)
      .save(res.handleJson);
  };

  Controller.update = function(req, res, next) {
    var query = {_id : req.params.id},
        body  = req.body,
        mod   = {};

    if (mod) {
      Object.keys(body).forEach(function (k) {
        if (typeof body[k] === "string" || typeof body[k] === "number") {
          if (!mod['$set']) mod['$set'] = {};
          mod['$set'][k] = body[k];
        } else if (body[k].length)
          mod[k] = {'$push' : body[k]};
      });
    }
    Model.update(query, mod)
      .exec(res.handleJson);
  };

  Controller.remove = function(req, res, next) {
    Model.remove({_id : req.params.id})
      .exec(res.handleJson);
  };

  return Controller;
}

module.exports = BaseController;

function ModelBuilder(model) {
  var mongoose = require("mongoose"),
      Schema   = mongoose.model(model),
      Model    = {},
      pop      = [],
      tree     = Schema.base.models[model].schema.tree


  Object.keys(tree).forEach(function(k) {
      if (tree[k].ref) pop.push(k)
  });

  Model.find = function (query, config) {
    return pop.length > 0 ?
              Schema.find(query, config).populate(pop.join(" ")) :
              Schema.find(query, config)
  }

  Model.findOne = function (query, config) {
    return pop.length > 0 ?
              Schema.findOne(query, config).populate(pop.join(" ")) :
              Schema.findOne(query, config)
  }

  Model.create = function (data) {
    return new Schema(data);
  }

  Model.update = function (query, mod) {
    return Schema.update(query, mod)
  }

  Model.remove = function (query) {
    return Schema.remove(query)
  }

  return Model;
}

module.exports = ModelBuilder;

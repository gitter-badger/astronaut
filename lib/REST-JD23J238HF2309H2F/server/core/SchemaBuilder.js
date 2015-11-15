function SchemaBuilder (fn) {
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      data   = fn(Schema.Types);

  var schema = new Schema(data.schema);
  return mongoose.model(data.name, schema);
}

module.exports = SchemaBuilder;

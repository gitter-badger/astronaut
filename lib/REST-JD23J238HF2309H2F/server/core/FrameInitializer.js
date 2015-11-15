var express = require("express"),
    app     = express(),
    sBld    = require("./SchemaBuilder"),
    main    = require("./../configs/MainConfig");

if (main.bodyParser) {
  var bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
}

if (main.database) {
  var db = require("./DataBaseInitializer")(main.database),
  normalizedPath = require("path").join(__dirname, "schemas").split("/");
  normalizedPath.splice(normalizedPath.indexOf("core"), 1);

  require("fs").readdirSync(normalizedPath.join("/")).forEach(function(file) {
    if (file != '.gitkeep')
      sBld(require("./../schemas/" + file));
  });
}

// if (main.authenticate) { 
//   var
// }

if (main.cors.status) {
  var cors = require("cors");
  app.use(cors(main.cors.options));
}

app.use(function (req, res, next) {
    res.handleJson = function (err, data) {
      if (err) res.json(err)
      else res.json(data)
    }

    next();
})

app = require("./RouteAttacher")(app, main);

app.listen(main.port, function () {
  console.log("Server on port " + main.port);
})

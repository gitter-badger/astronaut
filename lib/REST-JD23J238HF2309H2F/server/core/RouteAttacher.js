var Auth = require('./../core/AuthMiddleware'),
    acfg = require('./../configs/AuthConfig'),
    nmid = function (req, res, next){next()},
    middleware = null;

function RouteAttacher(app, main) {
  var routes  = require("./../configs/RouteConfig"),
      methods = ["get", "post", "put", "delete", "all"];

  routes.forEach(function (r) {
    var url        = "/" + main.apiPrefix + "/" + r.api,
        controller = r.controller == "Generic" ? require("./../libs/BaseController")(r.model) : require("./../controllers/" + r.controller);

    methods.forEach(function (m) {

      if (main.authenticate) {
        if (acfg.include) {
          acfg.include.forEach(function (i) {
            middleware = r.api === i.api && i.methods.indexOf(m) ? Auth.verify : nmid;
          });
        } else if (acfg.exclude) {
          acfg.exclude.forEach(function (e) {
            middleware = r.api === e.api && e.methods.indexOf(m) ? nmid : Auth.verify;
          });
        }
      } else {
        middleware = nmid;
      }

      if (m == "get") {
        if (controller.findById)
          app.get(url + "/:id", middleware, controller.findById);

        if (controller.find)
          app.get(url, middleware, controller.find);
      } else if (m == "post" && controller.create) {
        app.post(url, middleware, controller.create);
      } else if (m == "put" && controller.update) {
        app.put(url + "/:id", middleware, controller.update);
      } else if (m == "delete" && controller.remove) {
        app.delete(url + "/:id", middleware, controller.remove);
      } else if (m == "all" && controller.middleware) {
        app.all(url, middleware, controller.middleware);
      }
    });
  });

  var url = "/" + main.apiPrefix + "/authenticate";

  app.post(url, Auth.create);
  // app.get(url, Auth.readData);
  // app.delete(url, Auth.remove);

  return app;
}

module.exports = RouteAttacher;

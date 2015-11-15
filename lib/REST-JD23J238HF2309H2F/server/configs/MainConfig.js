module.exports = {
  database   : "localhost/blog",
  apiPrefix  : "api",
  port       : 3000,
  bodyParser : true,
  cors       : {
    status  : true,
    options : {
      methods : "*"
    }
  },
  authenticate : false
};

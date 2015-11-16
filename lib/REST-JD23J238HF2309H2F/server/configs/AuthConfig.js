module.exports = {
  model       : "User",
  secret      : "A2344GN0VV4039VMQ0WD80",
  requestType : ["header"],
  requestName : "token",
  responseName: "token",
  //timeout     : 2000,
  query       : {email : '###', password : '###'},
  tokenFields : ["name", "email"]
};

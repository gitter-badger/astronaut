var shell  = require('shelljs'),
    color  = require('colors');

module.exports = function (args, lib)  {
  if (args[1] === "rest") {
    shell.cp('-Rf', lib + 'REST-JD23J238HF2309H2F', './');
    shell.mv('REST-JD23J238HF2309H2F', args[2]);
  } else {
    console.log(color.red('Command not found try --help'));
  }
};

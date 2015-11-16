#!/usr/bin/env node
var shelljs = require('shelljs'),
    colors  = require('colors');

if (process.argv.length > 2) {
  var lib = "/usr/local/lib/node_modules/astronaut/lib/";
  process.argv.splice(0,2);

  if (process.argv[0] === "create") {
    require('./bin/create')(process.argv, lib);
  } else if (process.argv[0] == 'help'){
    require('./bin/help')();
  } else if (process.argv[0] == 'run'){
    require('./bin/run')();
  } else {
    console.log(colors.bold.red('Command not found! Try :') + colors.green(' astronaut help'));
  }
} else {
  console.log(colors.bold.red('Command not found! Try :') + colors.green(' astronaut help'));
}

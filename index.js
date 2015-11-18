#!/usr/bin/env node
var shelljs = require('shelljs'),
    colors  = require('colors');

if (process.argv.length > 2) {
  var lib = "/usr/local/lib/node_modules/astronaut/lib/";
  process.argv.splice(0,2);

  if (process.argv[0] === "create" || process.argv[0] === "init") {
    //TO DO - CREATE ASTRONAUT.JSON
    require('./bin/create')(process.argv, lib);
  } else if (process.argv[0] == 'help'){
    require('./bin/help')();
  } else if ((process.argv[0] === "angular")) {
    //cria angular a partir do RouteConfig
  } else if (process.argv[0] == 'update') {
    //atualiza projeto com versão remota
  } else if (process.argv[0] == 'deploy'){
    //sobe projeto em ambiente remoto
  } else if (process.argv[0] == 'run' || process.argv[0] == 'serve'){
    require('./bin/run')();
  } else if (process.argv[0] == 'version' || process.argv[0] == '--version' || process.argv[0] == '-v'){

  } else {
    console.log(colors.bold.red('Command not found! Try :') + colors.green(' astronaut help'));
  }
} else {
  console.log(colors.bold.red('Command not found! Try :') + colors.green(' astronaut help'));
}

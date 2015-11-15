var color  = require('colors');

module.exports = function ()  {
  console.log("Thanks for use " + color.cyan('Astronaut') + " you call for help?");

  //COMMANDS
  console.log(' ');
  console.log(color.bold.cyan('-- COMMANDS --'));
  console.log(' ');
  console.log(color.bold('create') + " - Create a Astronaut Project");
  console.log(color.bold('update') + " - Update Astronaut Project Dependencies");
  console.log(color.bold('start')  + " - Run Astronaut Project");
  console.log(color.bold('help')  + "  - Call the help... o shit! I think that u know that!");

  //CREATE
  console.log(' ');
  console.log(color.bold.cyan('-- CREATE --'));
  console.log(' ');
  console.log(color.bold('rest') + "   - Create a Astronaut Rest Project");
  console.log(color.bold('restio') + " - Create a Astronaut Rest w/ SocketIO Project");
  console.log(color.bold('mean') + "   - Create a Astronaut Mean Project");
  console.log(color.bold('meanio') + " - Create a Astronaut Mean w/ SocketIO Project");
};

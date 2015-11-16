var color  = require('colors');
require('shelljs/global');

module.exports = function (args, lib)  {
  if (!which('git')) {
    console.log(color.bold.red('Sorry, install GIT!'));
    exit(1);
  }

  if (args[1] === "rest") {
    exec('git clone https://github.com/astronautjs/astronaut-rest.git REST-JD23J238HF2309H2F')
    mv('REST-JD23J238HF2309H2F', args[2]);
    cd(args[2]);
    exec('npm install');
    exec('rm -Rf REST-JD23J238HF2309H2F');
    console.log(color.bold.magenta('Thanks for using Astronaut! To infinity and beyond'));
  } else {
    console.log(color.red('Command not found try --help'));
  }
};

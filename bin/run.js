var color  = require('colors');
require('shelljs/global');

module.exports = function (args) {
  exec('node server/core/FrameInitializer.js');
};

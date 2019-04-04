var path = require('path');

var extractFilePath = function (url) {
  var file_path;
  var file_name = 'index.html';

  if (url.length > 1) {
    file_name = url.substring(1);
  }
  console.log('The file_name is: ' + file_name);

  file_path = path.resolve(__dirname, 'app', file_name);
  return file_path;
};

module.exports = extractFilePath;

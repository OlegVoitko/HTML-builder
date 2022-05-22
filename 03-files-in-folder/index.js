const fs = require('fs');
const path = require('path');

const {stdout} = process;

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  else {
    files.forEach(file => {
      if(file.isFile()){
        let size = 0;
        let fileName = file.name.split('.')[0];
        let fileExtension = path.extname(file.name).replace(/[.]/gi, '');        
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          if (err) throw err;
          else{
            size += stats.size / 1024;
          }
          stdout.write(`${fileName} - ${fileExtension} - ${size}kb\n`);
        });        
      }
    });
  }
});
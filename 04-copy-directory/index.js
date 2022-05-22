const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {  
  if (files) {
    files.forEach(file => {
      fs.unlink(path.join(path.join(__dirname, 'files-copy'), file), () => {
      });
    });
  } 
});

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, err => {
  if(err) throw err;
  console.log('Folder created');
});

fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  else {
    files.forEach(file => {          
      fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname,'files-copy', file.name), (err) => {
        if(err) throw err;
        console.log('File copied');
      });                                
    });
  }
});

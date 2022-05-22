const fs = require('fs');
const path = require('path');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'),'w', (err) => {
  if(err) throw err;
  console.log('File created');
});

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  else {
    const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css')); 
    files.forEach(file => {          
      if(file.isFile()){            
        if(path.extname(path.join(__dirname, 'styles', file.name)) === '.css'){
          const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');          
          readStream.pipe(writeStream);          
        }       
      }                                   
    });
  }
});

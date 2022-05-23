const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, err => {
  if(err) throw err;
  console.log('Folder created');
});

fs.open(path.join(__dirname, 'project-dist', 'style.css'),'w', err => {
  if(err) throw err;
  console.log('File created');
  fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    else {
      const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css')); 
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
});
  
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) throw err;
  function func(currentFile, dir) {
    fs.readdir(currentFile, {withFileTypes: true}, (err, files) => {
      if (err) throw err;  
      files.forEach(file => {
        let fileName = path.join(__dirname, 'project-dist', 'assets', `${dir}`, `${file.name}`);
        if (file.isFile()) {
          fs.writeFile(fileName, '', {}, err => {
            if (err) throw err;  
            fs.copyFile(path.join(__dirname, 'assets', `${dir}`, `${file.name}`), fileName, () => {});
          });
        } else {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${file.name}`), {recursive: true}, err => {
            if (err) throw err;
          });
          func(path.join(__dirname, 'assets', `${file.name}`), file.name);
        }
      });
    });
  }  
  let file = path.join(__dirname, 'assets');
  func(file);
});

const createlHtml = fs.createReadStream(path.join(__dirname, 'template.html'),'utf-8');  
createlHtml.on('data', data => {
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    for (let i = 0; i < files.length; i++) {
      let componentsHtml = fs.createReadStream(path.join(__dirname, 'components', files[i]), 'utf-8');
      componentsHtml.on('data', (code) => {
        data = data.replace(`{{${path.parse(files[i]).name}}}`, code);  
        if (i === files.length - 1) {
          fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), data, err => {
            if (err) throw err;
          });
        }
      });
    }
  });
});
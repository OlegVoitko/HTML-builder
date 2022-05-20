const fs = require('fs');
const path = require('path');

const {stdin, stdout} = process;

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hi, student! Enter the text\n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit'){
    stdout.write('Goodbye');
    process.exit();
  }else{
    stream.write(data);    
  }
});
	
process.on('SIGINT', () => {
  stdout.write('Goodbye');
  process.exit();
});
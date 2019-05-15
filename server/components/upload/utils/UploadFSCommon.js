const fs = require('fs');

//create a new dir
const mkdir = (path) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if(err) reject(err);
            else resolve();
        });
    });
};

//create a file and write to it
const writeFile = (file, filePath) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, file, (err) => {
            if(err) reject(err);
            else resolve();
        });
    });
};

// read file
const readFile = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
};

const appendFile = (file, filePath) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, file, err => {
            if(err) reject(err);
            else resolve();
        });
    });
};

// file type
const fileType = (file) => {
    const fileName = Object.keys(file)[0];
    return file[fileName].type;
};

module.exports = {
    mkdir,
    writeFile,
    readFile,
    fileType,
    appendFile
}
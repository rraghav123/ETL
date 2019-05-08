const IncomingForm = require('formidable').IncomingForm;
const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

//PARSE UPLOADED FILES
const fileParser = (req, res) => {
  const form = new IncomingForm();
  form.uploadDir = path.join(__dirname, 'upload');
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024; //10Mb
  form.multiples = false;
  form.parse(req, (err, fields, file) => {
    if (err) {
      res.status(500).json({
        result: 'failed',
        data: {},
        message: `File failed to upload with err: ${err}`
      })
    } else {
      const fileName = Object.keys(file)[0];
      fs.appendFile(path.join(__dirname, 'logs/logs.txt'),
        `fileName-${file[fileName].name}__fileSize-${file[fileName].size}__fileType-${file[fileName].type}  \n`,
        (err) => {
        if(err) throw err;
        });
      res.status(200).json({
        result: 'ok',
        message: 'File uploaded successfully'
      });
      convertCSVtoJSON(file, fileName);
    }
  })
};

// CONVERT CSV TO JSON;
const convertCSVtoJSON = (file, fileName) => {
  const csvFilePath = path.join(__dirname, 'upload', path.basename(file[fileName].path));
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      const dir =  path.join(__dirname, 'csvToJson');
      if(!fs.existsSync(dir)) {
        fs.mkdir(path.join(__dirname, 'csvToJson'), {}, function(err) {
          if(err){
            throw err;
          }
          console.log("csvToJson Folder created")
        });
      }
      fs.writeFile(path.join(dir, `${path.parse(fileName).name}.json`), JSON.stringify(jsonObj), (err) => {
        if(err) throw err;
        else {
          fs.appendFile(path.join(__dirname, 'logs/logs.txt'),
            `${fileName} converted to ${path.parse(fileName).name}.json\n`,
            (err) => {
            if(err) throw err;
            }
          )
        }
      })
    })
};

module.exports = fileParser;
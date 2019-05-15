const node_xj = require("xls-to-json-lc");

const { UploadSaveSSN, UploadSaveParsedFile } = require('../../model/');
const { ValidateSSN } = require('../../utils');

const XLSParser = (file) => {
    const { path, name } = file[Object.keys(file)[0]];
    node_xj({
        input: path,  // input xls
        output: null, // output json
      }, (err, result) => {
        if(err) throw err;
        else {
            UploadSaveParsedFile(JSON.stringify(result), `${name}.json`);
            const ssn = ValidateSSN(result);
            if(ssn.length > 0) {
                UploadSaveSSN(ssn, name);
            };
        }
      });
};

module.exports = XLSParser;

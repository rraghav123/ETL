const { UploadSaveSSN, UploadSaveParsedFile } = require('../../model/');
const { FsUtils, CSVtoJSON, ValidateSSN } = require('../../utils');

const CSVParser = async (file) => {
    const { path, name } = file[Object.keys(file)[0]];
    const parsedCsv = await FsUtils.readFile(path);
    const value = CSVtoJSON(parsedCsv)
    UploadSaveParsedFile(JSON.stringify(value), `${name}.JSON`);
    const ssn = ValidateSSN(value, name);
    if(ssn.length > 0) {
        UploadSaveSSN(ssn, name);
    }
}

module.exports = CSVParser;


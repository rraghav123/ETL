const { UploadSaveSSN, UploadSaveParsedFile } = require('../../model/');
const { ValidateSSN, FsUtils } = require('../../utils');

const JSONParser = async (file) => {
    const { path, name } = file[Object.keys(file)[0]];
    const parsedJson = await FsUtils.readFile(path);
    UploadSaveParsedFile(parsedJson, name);
    const ssn = ValidateSSN(JSON.parse(parsedJson));
    if(ssn.length > 0) {
        UploadSaveSSN(ssn, name);
    }
}

module.exports = JSONParser;

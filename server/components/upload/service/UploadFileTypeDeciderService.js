// const csv = require('csvtojson');
const { FsUtils } = require('../utils/');
const { FILE_TYPES } = require('../utils/Enums/');
const { UploadSaveParsedFile } = require('../model/index')
const { CSVParser, JSONParser, XLSParser } = require('./FileParser/');

const UploadFileTypeDeciderSerivce = async (file) => {
    const fileType = FsUtils.fileType(file);
    switch(fileType) {
        case FILE_TYPES.CSV:
            CSVParser(file);
            break;
        case FILE_TYPES.JSON:
            JSONParser(file);
            break;
        case FILE_TYPES.XLS:
            XLSParser(file);
            break;
        default:
            const { path, name } = file[Object.keys(file)[0]];
            const parsedFile = await FsUtils.readFile(path);
            UploadSaveParsedFile(parsedFile, name);
    };
};

module.exports = UploadFileTypeDeciderSerivce;

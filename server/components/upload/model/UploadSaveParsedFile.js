/* WRITE LOGIC TO CONNECT DB HERE */

const FsUtils = require('../utils/UploadFSCommon');
const path = require('path');
const fs = require('fs');

const UploadSaveParsedFile = async(file, fileName) => {
    const dir =  path.join(__dirname, '../../../statics');
    const fileDir = path.join(dir, fileName);
    if(!fs.existsSync(dir)) {
        await FsUtils.mkdir(dir);
    }
    await FsUtils.writeFile(file, fileDir);
}

module.exports = UploadSaveParsedFile;

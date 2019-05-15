/*
    Upload SSN
*/

const path = require('path');
const fs = require('fs');
const { FsUtils } = require('../utils');

/**
 *
 * @param {*} ssn typeof(ssn) === array
 * @param {*} key typeof(key) === string
 * Will append {key: value} in SSN.js
 */

const UploadSaveSSN = async (ssn, key) => {
    const dir = path.join(__dirname, '../../../statics');
    const fileDir = path.join(dir, 'SSN.js');
    if(!fs.existsSync(dir)) {
        await FsUtils.mkdir(dir)
    }
    if(!fs.existsSync(fileDir)) {
        const arr = [];
        arr.push({[key]: ssn});
        await FsUtils.writeFile(JSON.stringify(arr), fileDir);
    } else {
        const StringifiedSSN = await FsUtils.readFile(fileDir);
        const arr = StringifiedSSN.length > 0 ? JSON.parse(StringifiedSSN) : [];
        arr.push({[key]: ssn});
            await FsUtils.writeFile(JSON.stringify(arr), fileDir);
        }
}

module.exports = UploadSaveSSN;

const CSVtoJSON = (csv) => {
    const arr = csv.split('\r\n');
    // extract keys for JSON
    const keys = (arr.splice(0,1))[0].split(',');
    // map keys with fields
    const CSVtoJSON = arr.map(str => {
        const filteredField = str.split(',');
        return filteredField.reduce((obj, fieldValue, index) => {
            return {
                ...obj,
                [keys[index]]: fieldValue,
            }
        }, {});
    });
    return CSVtoJSON;
};

module.exports = CSVtoJSON;

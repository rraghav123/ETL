/**
 *
 * @param {*} file file should be an array need to be handeled if it's comming as an object
 */

const ValidateSSN = file => {
    // typeof(file) === array
    const ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
    const ssn = [];
    if(Array.isArray(file)) {
        file.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if(ssnPattern.test(obj[key])) {
                    ssn.push(obj[key]);
                }
            })
        })
    }
    return ssn;
}

module.exports = ValidateSSN;

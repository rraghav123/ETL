const IncomingForm = require('formidable').IncomingForm;
const UploadFileTypeDeciderService = require('./UploadFileTypeDeciderService');

const UploadIncomingFileParserService = async (req, res) => {
    const form = new IncomingForm();
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
          (async () => {
            res.status(200).json({
              result: 'ok',
              message: 'File uploaded successfully'
            });
            UploadFileTypeDeciderService(file);
          })();
        }
      }
    )};

module.exports = UploadIncomingFileParserService;

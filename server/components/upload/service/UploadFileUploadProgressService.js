const Pusher = require('pusher');

const IncomingFileParser = require('./UploadIncomingFileParserService');
const KEYS = require('../../../config/keys');

const FileUploadProgress = (req, res) => {
    const pusher = new Pusher({
        appId: KEYS.PUSHER_APP_ID,
        key: KEYS.PUSHER_APP_KEY,
        secret: KEYS.PUSHER_APP_SECRET,
        cluster: KEYS.PUSHER_APP_CLUSTER
      });
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      pusher.trigger('upload', 'progress', {
        percent,
      });
      if (percent === 100) {
        IncomingFileParser(req,res);
        clearInterval(interval);
      }
    }, 100);
};

module.exports = FileUploadProgress;

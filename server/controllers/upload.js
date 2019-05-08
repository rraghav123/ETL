const express = require('express');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const Pusher = require('pusher');
const KEYS = require('../keys');
const fileParser = require('../utils');

const router = express.Router();

const pusher = new Pusher({
  appId: KEYS.PUSHER_APP_ID,
  key: KEYS.PUSHER_APP_KEY,
  secret: KEYS.PUSHER_APP_SECRET,
  cluster: KEYS.PUSHER_APP_CLUSTER
});

// router.use((req, res, next) => {
//   fs.appendFile(path.join(__dirname, '../', 'logs/logs.txt'),
//     `${req.protocol}://${req.get('host')}${req.originalUrl} ${moment().format()}\n`,
//     );
// });

router.post('/', (req, res, next) => {
  // progress
  let percent = 0;
  const interval = setInterval(() => {
    percent += 10;
    pusher.trigger('upload', 'progress', {
      percent,
    });
    if (percent === 100) {
      // parse a file
      fileParser(req,res);
      clearInterval(interval);
    }
  }, 100);
});

module.exports = router;
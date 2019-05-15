const express = require('express');
const router = express.Router();
const FileUploadProgress = require('../service/UploadFileUploadProgressService');

router.post('/', async (req, res) => FileUploadProgress(req, res));

module.exports = router;
const express = require('express');
// const logger = require('./middleware/logger');

const app = express();

//upload API route
app.use('/upload', require('./components/upload/controllers/Upload'));

//init middleware
// app.use(logger);
module.exports = app;





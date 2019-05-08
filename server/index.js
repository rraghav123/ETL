const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const app = express();

const PORT = process.env.PORT || 5000;

//upload API route
app.use('/upload', require('./controllers/upload'));

//init middleware
app.use(logger);

app.use(cors());

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));




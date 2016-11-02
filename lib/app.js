const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const path = require('path');

const roasters = require('./routes/roasters');
const pubDir = path.join(__dirname, '../public');

app.use('/roasters', roasters);
app.use('/', express.static(pubDir));
app.use(errorHandler);

module.exports = app;
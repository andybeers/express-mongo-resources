const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const path = require('path');

const roasters = require('./routes/roasters');
const varietals = require('./routes/varietals');
const pubDir = path.join(__dirname, '../public');

app.use('/api/roasters', roasters);
app.use('/api/varietals', varietals);
app.use('/', express.static(pubDir));
app.use(errorHandler);

module.exports = app;
const express = require('express');
const noteRouter = require('./noteRouter')
const app = express()

app.use('/notes', noteRouter);

module.exports = app
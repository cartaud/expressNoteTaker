const express = require('express');
const noteRouter = require('./noteRouter') //imports the /noteRouter module, giving us access to its exported functions
const app = express()
//when the request from server is sent with url ending in /notes, this triggers sending us to the appropriate route in /noteRouter
app.use('/notes', noteRouter); 

module.exports = app
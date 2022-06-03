//My comments are a bit excessive but it helps me learn
const express = require('express'); //allows the use of express
const path = require('path'); //imports path module that provides utilities for working with file and directory paths
const api = require('./routes/index.js'); //imports module with all routes 

const app = express() //pulls the express() function out of express and assigns it to variable app
const PORT = process.env.PORT || 3001; //port that the server is listening to

//middleware (configuration)
app.use(express.static('public')); //gives access to public folder, allowing the sending of html pages to user
app.use(express.json()); //allows the parsing of the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true})); //allows the gathering of information through the URL
app.use('/api', api) //when a request with /api in the url is sent, this will send the request to appropriate api in /routes/index.js

app.get('/', (req, res) => //when url ends with /, this will trigger and send the user the public/index.html page
    res.sendFile(path.join('public/index.html'))
);

app.get('/notes', (req, res) => //when url ends with /notes, this will trigger sending the user the public/notes.html
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () => //tells the server to listen on specified port
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
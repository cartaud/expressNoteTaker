const notes = require('express').Router(); //allows us to modularize our routes and assigns notes as the app variable
const uuid = require('../helpers/uuid'); //module that generates a random 4 character id
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils'); //module with all of our helper functions


notes.get('/', (req, res) => { //when a GET request is sent through with url /api/note, this will trigger
    //read the `db.json` file and return all saved notes as JSON
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {  //when a POST request is sent through with url /api/note, this will trigger
    //receive a new note to save on the request body, add it to the `db.json` file, then return the new note to the client.
    const {title, text} = req.body; //equivalent to const title = req.body.title and same for text 
    if (req.body) { //if the req.body exists, this will be true
        const newNote = { //creates a new note with the information the user sent to server (title and text)
            title,
            text,
            id: uuid()
        }
        readAndAppend(newNote, './db/db.json'); //reads the current state of db and saves it to variable, appends the new note to variable, then writes variable to db
        res.status(201).json('Note added successfully'); //responds to users request 
    } else {
        res.status(500).json('Error adding note')
    } 
})

notes.delete('/:id', (req, res) => {  //when a DELETE request is sent through with url /api/note/id (where id is the id of the note that is to be deleted), this will trigger
    const noteId = req.params.id; //id of note to be deleted
    readFromFile('./db/db.json') //gets all of the content of db
    .then((data) => JSON.parse(data)) //call back of returned data from reading db
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId); //filters the content of returned json to remove note with specified id
        writeToFile('./db/db.json', result); //writes to db with the desired note removed
        res.status(201).json(`Item ${noteId} has been deleted`) //responds to users request
    })
})

module.exports = notes //because each route is a method of notes, we only have to export notes
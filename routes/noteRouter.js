const notes = require('express').Router();
const db = require('../db/db.json')
const uuid = require('../helpers/uuid');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    //read the `db.json` file and return all saved notes as JSON
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

//receive a new note to save on the request body, add it to the `db.json` file, then return the new note to the client.
notes.post('/', (req, res) => {    
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        }
        readAndAppend(newNote, './db/db.json');
        res.status(201).json('Note added successfully'); //we respond with json and then on line 44 of index we turn the json into json?
    } else {
        res.status(500).json('Error adding note')
    } 
})

notes.delete('/:id', (req, res) => {  
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.status(201).json(`Item ${noteId} has been deleted`)
    })
})

module.exports = notes
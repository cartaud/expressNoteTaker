const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const uuid = require('./helpers/uuid')

const app = express()
const PORT = 3001

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => 
    res.sendFile(path.join('public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    //read the `db.json` file and return all saved notes as JSON
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    //receive a new note to save on the request body, add it to the `db.json` file,
    //then return the new note to the client.
    //find a way to give each note a unique id when it's saved
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err
            const oldData = JSON.parse(data);
            oldData.push(newNote);
            const updatedData = oldData;
            fs.writeFile('./db/db.json', JSON.stringify(updatedData), (err) => {
                if (err) throw err
                console.log('new note added')
            })
        })

        const response = {
            status: 'success',
            body: newNote,
        }
        console.log(response)
        res.status(201).json(response);
    } else {
        res.status(500).json('Error adding note')
    }

    
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
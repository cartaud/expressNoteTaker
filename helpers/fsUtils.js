const fs = require('fs'); //module that enables interacting with the file system
const util = require('util'); //module that supports the needs of Node.js internal APIs

const readFromFile = util.promisify(fs.readFile); //readFromFile('file location') then returns the content of file

const writeToFile = (destination, content) => //writes specified content to specified destination 
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => { 
    fs.readFile(file, 'utf8', (err, data) => { //asynchronously reads the entire contents of a file.
        if (err) { //if an error exist, log it
            console.error(err);
        } else { //otherwise append new data to the returned data
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(file, parseData) //asynchronously writes data to a file, replacing the file if it already exists.
        }
    });
};

module.exports = {readFromFile, writeToFile, readAndAppend} //allows the use of these functions in other modules 




    
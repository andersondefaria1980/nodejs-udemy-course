const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    console.log(loadNotes())
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })
    if (duplicateNotes.length === 0) {
        notes.push({title: title, body: body})
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title ['+title+'] taken!'))
    }    
    
}

const removeNote = function(title) {
    const notes = loadNotes()
    const newNotes = notes.filter(function(note){
        return note.title !== title
    })

    if(newNotes.length === notes.length){
        console.log(chalk.red.inverse('Title ['+ title +'] not found!'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.green.inverse('Note [' + title + '] removed!'))
    }

}

const saveNotes = function (notes) {
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', jsonData)
}


const loadNotes = function() {

    try{
        const dataBuffer = fs.readFileSync('notes.json')    
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes, 
    addNote: addNote,
    removeNote: removeNote,
}
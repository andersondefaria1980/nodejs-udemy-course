const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes  = loadNotes();

    console.log('')
    console.log(chalk.blue.inverse('Yout Notes:'))    
    console.log('')
    
    notes.forEach((n) => {        
        printNote(n)
    })
}

const printNote = (note) => {
    console.log('Title: ' + note.title)
    console.log('Body: ' + note.body)
    console.log('')
}

const addNote = (title, body) => {
    const notes = loadNotes()    
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({title: title, body: body})
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title ['+title+'] taken!'))
    }    
    
}

const removeNote = function(title) {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title )

    if(newNotes.length === notes.length){
        console.log(chalk.red.inverse('Title ['+ title +'] not found!'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.green.inverse('Note [' + title + '] removed!'))
    }

}

const saveNotes = (notes) => { fs.writeFileSync('notes.json', JSON.stringify(notes)) }

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')    
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const readNote = (title) => {
    const note = loadNotes().find((n) => n.title === title)

    if(note) {
        console.log('')
        console.log(chalk.blue.inverse('Note found:'))    
        console.log('')
        printNote(note)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }

   
}

module.exports = {
    listNotes: listNotes, 
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
}
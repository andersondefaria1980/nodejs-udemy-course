const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anderson Faria'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anderson Faria'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anderson Faria',
        helpText: 'This is the hel of the weather app. Enjoy!'
    })
})

// app.com/about
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny! It is currently 30 degrees out. It feels like 33 degrees.',
        location: 'Florianópolis'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


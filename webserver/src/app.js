const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


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
    if (!req.query.address) {        
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {    

        if (error) {
            return res.send({ error: error })      
        } 
    
        forecast({ latitude, longitude }, (error, weatherData) => {
            if (error) {
                return res.send({ error: error })
            }                    
            res.send({
                forecast: weatherData.weather_description,
                location: weatherData.location.name + ' / ' + weatherData.location.region + ' / ' + weatherData.location.country,
                address: req.query.address
            })
        })

    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {        
        return res.send({
            error: 'You must provide a serch term'
        })
    }
    console.log(req.query)
    res.send({
        products: []        
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


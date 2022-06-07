const request = require('postman-request')

let url = 'http://api.weatherstack.com/current?access_key=cd84bd3f69f35e47c3f832104bd768d9&query='

const urlAddress = 'http://api.positionstack.com/v1/forward?access_key=01a2cd1a3c346aa8c0b656412c506550&query=1600%Pennsylvania%Ave%NW,%20Washington%20DC'

request({url: urlAddress, json: true},
    (error, response) => {
        const data = response.body.data[0]
        console.log('Latitude: ' + data.latitude + '  ===  Logitude: ' + data.longitude)
        url += data.latitude + ',' + data.longitude

        request(
            { url: url, json: true }, 
            (error, response) => {                
                
            const current = response.body.current
        
            const s = current.weather_descriptions[0] + '! It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees.'    
            console.log(s)
        })

    })



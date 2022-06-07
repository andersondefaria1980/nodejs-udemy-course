console.log('')
const request = require('postman-request')
//38.82652,-77.01712

let urlWeather = 'http://api.weatherstack.com/current?access_key=cd84bd3f69f35e47c3f832104bd768d9&query=38.82652,-77.01712'

let address = '1600%Pennsylvania%Ave%NW,%20Washington%20DC'
//address = '123456789'
const urlGeocoding = 'http://api.positionstack.com/v1/forward?access_key=01a2cd1a3c346aa8c0b656412c506550&query=' + address

request(
    {url: urlGeocoding, json: true},
    (error, response) => {        
        if (error) {            
            console.log('Unable do connect to weather service! Error: ' + error.message)        
        } else {
            if (!response.body.error) {                
                //console.log(response.body)
                if (response.body.data.length < 1) {
                    console.log('No results found for the address: "'+ address +'"')
                } else {
                    const data = response.body.data[0]                            
                    console.log('Latitude: ' + data.latitude + '  ===  Logitude: ' + data.longitude)            
                    urlWeather += data.latitude + ',' + data.longitude
                }
            } else {
                console.log('Error to get Geocoding coordinates with the URL('+urlGeocoding+').')
                console.log('Code: ' +  response.body.error.code)                
                console.log('Message: ' +  response.body.error.message)
            }
        }
         console.log('')
    })

// request(
//     { url: urlWeather, json: true }, 
//     (error, response) => {                
//         if (error) {            
//             console.log('Unable do connect to weather service! Error: ' + error.message)                    
//         } else {    
//             //console.log(response)        
//             if (!response.body.error) {
//                 const current = response.body.current
//                 const s = current.weather_descriptions[0] + '! It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees.'    
//                 console.log(s)
//             } else {
//                 console.log('Error to get the weather with the URL('+urlWeather+').')
//                 console.log('Code: ' +  response.body.error.code)
//                 console.log('Type: ' +  response.body.error.type)
//                 console.log('Message: ' +  response.body.error.info)
//             }
//         }
//         console.log('')        
// })



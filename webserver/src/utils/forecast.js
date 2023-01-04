const request = require('postman-request')

const forecast = (params, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cd84bd3f69f35e47c3f832104bd768d9&query=' + params.latitude + ',' + params.longitude
    
    request({url, json: true},(error, { body} = {}) => {        
        if (error) {
            callback('Unable do connect to Weather service! Error: '+ error.message, undefined)
        } else if (body.error) {  
            const errorMsg = 'Error to get the weather for the Latitude('+ params.latitude +') and Longitude(' + params.longitude + ') | Code: ' + body.error.code + ' | Message: ' + response.body.error.info
            callback(errorMsg, undefined)
        } else if (body.current === null){
            const errorMsg = 'No results found for the address: Latitude('+ params.latitude +') and Longitude(' + params.longitude + ')'
            callback(errorMsg, undefined)
        } else {          
            const current = body.current                        
            const data = {
                weather_description: current.weather_descriptions[0] + '! It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees.',
                location: body.location,
                temperature: current.temperature,
                feelslike: current.feelslike,
            }
            callback(undefined, data)
        }

    })
}


module.exports = forecast
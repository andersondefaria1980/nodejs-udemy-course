const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=01a2cd1a3c346aa8c0b656412c506550&query=' + encodeURIComponent(address)
    
    request({ url, json: true },(error, { body } = {}) => {        
        if (error) {
            callback('Unable do connect to Geocoding service! Error: '+ error.message, undefined)
        } else if (body.error) {  
            const errorMsg = 'Error to get Geocoding coordinates with the URL(' + address + ') | Code: ' + body.error.code + ' | Message: ' + body.error.message
            callback(errorMsg, undefined)
        } else if (body.data.length < 1){
            const errorMsg = 'No results found for the address: "'+ address +'"'
            callback(errorMsg, undefined)
        } else {            
            const data = {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
            }
            callback(undefined, data)
        }

    })
}


module.exports = geocode
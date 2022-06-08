const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=cd84bd3f69f35e47c3f832104bd768d9&query=40,-75'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('Error', error)
})

request.end()
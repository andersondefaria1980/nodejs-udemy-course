const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()

const data = JSON.parse(dataJSON)

data.name = "Anderson de Faria"
data.planet = "Mercury"
data.age = 43

const string = JSON.stringify(data)
fs.writeFileSync('1-json.json', string)




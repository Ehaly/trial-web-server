const request = require('postman-request')

//units = m, units = s, units = f
const current = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bcc271086c8a582cead22e79acc9dda3&query='
    + latitude
    +','
    + longtitude
    +'&units=f'

    request({url: url, json: true},(error, {body})=>{
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else{
            const currInfo = body.current
            callback(undefined, {
                weather_descriptions: currInfo.weather_descriptions[0],
                temperature: currInfo.temperature,
                feelslike: currInfo.feelslike
            })
        }
    })
}

module.exports = current
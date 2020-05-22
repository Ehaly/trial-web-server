const request = require('postman-request')

const geocode = (address, callback) => {

    //encodeURIComponent will make ? to %3F
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)
    +'.json?access_token=pk.eyJ1IjoiZWhhbHkiLCJhIjoiY2thNHJyOXl4MHYxODNmbG1yc2lidTQ3MCJ9.OuXs6lyu54cCaPYh-ZqqiQ'

    request({url: url, json: true}, (error, {body}) => {
        //console.log(response.features.center[0], response.features.center[1])
        if (error){
            callback('Unable to connect to locations service!',undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search!',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0], 
                longitude: body.features[0].center[1],
                location: body.features[0].place_name

            }) 
        }
    })

}

module.exports = geocode


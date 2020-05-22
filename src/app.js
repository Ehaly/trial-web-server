const path = require('path')
const express = require('express')
const hbs = require('hbs') 

const geocode = require('./utils/geocode.js')
const current = require('./utils/current')



//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT||3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
    //customize views location.. update the viewsPath
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Ehaly'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Ehaly'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        helperText: 'There are some helpful tips',
        name: 'Ehaly'
    })
})
app.get('/weather', (req, res)=>{
    if (!req.query.address){
        res.send({
            error: 'You must provide an address'
        })
    } else {
        const address = req.query.address
        geocode(address, (error, {latitude, longitude, location}={})=>{
            //console.log('Error', error)
            //console.log('Data', data)
            if (error){
                //console.log('Error', error)
                res.send({error})
            } else{
                current(latitude, longitude, (error, {weather_descriptions: descriptions, temperature, feelslike})=>{
                    if (error) {
                        res.send({error})
                    }else {
                        res.send({
                            forecast: descriptions,
                            temperature: temperature,
                            feelslike: feelslike,
                            location: location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})
    


app.get('/products',(req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

//help item not found
app.get('/help/*',(req,res)=>{
    res.render('helpError',{
        title:'404',
        name: 'Ehaly',
        helpError: 'Help article not found'
    })
})

//404 page
app.get('*',(req, res)=>{
    res.render('generalError',{
        title:'404',
        name:'Ehaly',
        genError: '404 page'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})
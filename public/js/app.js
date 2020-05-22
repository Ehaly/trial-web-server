console.log('Client side javascript is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')

messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() //prevent browser form refreshing

    const location = search.value
    
    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        } else{
            console.log(data.location)
            console.log(data.forecast)

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
})

})
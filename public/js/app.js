const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    fetch('/weather?address='+search.value).then((res) => {
        res.json().then((data) => {
            // console.log(data)
            if(data.error) {
                console.log(data.error)
                
                // messageOne.textConttent = data.location
                messageTwo.innerHTML = data.error

            }else{
                const fore = 'Location '+data.location+' <br/>Temprature '+data.forecast.temperature+' Summary ' + data.forecast.summary

                // messageOne.textConttent = data.location
                messageTwo.innerHTML = fore

                console.log(fore)
            }
        })
    })

    console.log('testing')
})
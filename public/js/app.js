console.log('Client Side JS file loaded!')

const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const messageOne= document.querySelector('#message1') //# is used for id and . is used for class
const messageTwo = document.querySelector('#message2')

//messageOne.textContent='From JS'

weatherForm.addEventListener('submit',(e)=>{ //e is for event
    e.preventDefault()
    const location= search.value 
    
    console.log(location)
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
            //console.log(data.error)
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        // console.log(data.location)
        // console.log(data.forecast)
        }
    })
})
})
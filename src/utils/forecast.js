const request= require('request')

const forecast= (latitude,longitude,callback) => {
const url='https://api.darksky.net/forecast/8b6efab5f29bce7df43f97fef5bfe1a8/' +latitude+ ',' +longitude+ '?units=si';
request({ url, json: true }, (error, {body}) => {
     //console.log(response) 
     if(error){
         callback('Unable to connect to forecast!',undefined)
     }
     else if(body.error){
         callback('Unable to find the location',undefined)
     }
     else {
        callback(undefined,body.daily.data[0].summary+ ' It is curently '+body.currently.temperature+
                           ' degress out. There is a '+body.currently.precipProbability+'% chance of rain.'
                           +' \n The High temperature of the day is '+ body.daily.data[0].temperatureHigh +
                           ' degrees. The Low temperature of the day is '+ body.daily.data[0].temperatureLow + ' degrees.')
     }
   
})
}
module.exports = forecast
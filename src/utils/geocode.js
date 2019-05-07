const request= require('request')

const geocode = (address,callback) =>{
 const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic3dhcG5pbDkwIiwiYSI6ImNqdW8wcHh6bzBsOXgzenBwdGI2emV1bmgifQ.WNL2dNcQvJz8EG8Y7ueEMw&limit=1';
 //const url='https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=pk.eyJ1Ijoic3dhcG5pbDkwIiwiYSI6ImNqdW8wcHh6bzBsOXgzenBwdGI2emV1bmgifQ.WNL2dNcQvJz8EG8Y7ueEMw&limit=1';
 console.log(url)
 request({url ,json:true},(error,{ body })=>{
   // console.log(response)
        if(error){
            callback('Unable to connect to location!',undefined)//callback is expecing 2 param as eror and data in this case data will be by default undefined and if we need we can put it manually
        } else if(body.features.length === 0){
            callback('Unable to get location!',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
 }) 
}


module.exports = geocode
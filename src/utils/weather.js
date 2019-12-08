const request = require('request')

const forecast = ( lat, long, callback ) => {
    const url = 'https://api.darksky.net/forecast/50802294fe75cae1f741b1a5cfcc7eb1/'+ encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=ca'
    request({
            url,
            json:true
        },(error, {body})=>{
            if( error ) {
                callback('unable to conect to forecast service', undefined)
            }else if(body.error){
                callback('unable to find the forecast for the location')
            } else {
                callback( undefined, {
                    summary:body.currently.summary,
                    temperature:body.currently.temperature,
                    precip:body.currently.precipProbability
                })
            } 
        },
        (d)=>{
            console.log(d);
        }
    );
}

module.exports = forecast;
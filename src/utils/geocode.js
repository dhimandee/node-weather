const request = require('request')

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoiZGhpbWFuZGVlIiwiYSI6ImNrM3ZidGF2eTBjdnAzcHFlNWVnNGJ6YWUifQ.CT1djBm-Jomo1HCMP6pbzg';
    request({ url , json:true},(error,{body})=>{
        if( error ) {
            callback('unable to connect to location service', {});
        }else if(body.features.length <=0){
            callback('Unble to find location.', {});
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name
            })
        }  
    })
}
module.exports = geocode;
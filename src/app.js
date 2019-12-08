const path = require('path')
var express = require('express')
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs');
app.set('views', path.join( __dirname, '../templates/views' )  )

hbs.registerPartials(path.join( __dirname, '../templates/partials' ))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Home Page",
        name:"Deepak Kumar"
    }); 
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About',
        name: "Deepak Kumar"
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {'title':'Help Page',
    name:"Deepak Kumar"})
})

app.get('/weather', (req, res)=>{
    if ( !req.query.address) {
        return res.send({
            error:'Please provide address'
        })
    }
    geocode(req.query.address, (error, {place, latitude, longitude}={})=>{
        if( !error ) {
            forecast( latitude, longitude, (error, forecastdata) => {
                if( error ){
                    return res.send({
                        address:req.query.address,
                        error:error
                    });
                }
                return res.send({
                    address:req.query.address,
                    location:place,
                    forecast:forecastdata
                });
            })
        } else {
            return res.send({
                address:req.query.address,
                error:error
            });
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404',
        message:'Help article not found',
        name:'Deepak Kumar'
    })
})


app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        message:'Page not found',
        name:'Deepak Kumar'
    })
})

app.listen(3000, ()=>{
    console.log('Server up on 3000 port')
});
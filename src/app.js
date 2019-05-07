const path= require('path')
const express=require('express')
const hbs=require('hbs')
const geocode= require('../src/utils/geocode')
const forecast= require('../src/utils/forecast')


const app=express()//it doesnot take any argument instead we can use app for exploring the features

//Define path for Express Config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')//view engine to b written properly if not express will not come to know the exact task.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{ //render is used for handlebars
                title:'My Weather',
                name: 'Swapnil'
    })              
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Swapnil Joshi'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help!!',
        name:'Swapnil'
    })
})

//to set route for product
app.get('/product', (req, res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products:[]
    })
})

//to set route for weather
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter correct address'
        })
    }
    
    geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{ //if we pass special char in address as ex only ! it will give error so we set default value
        if(error){
            return  res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {//latitude n longitude is taken from geocode for callback chaining
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata ,
                location
            })
        })
    })
})

//done for specific request
app.get('/help/*',(req, res)=>{
    res.render('error',{
    errormsg:'Help article not found'})
})

//done for every request
app.get('*',(req, res)=>{ // * is a wild card character it is placed at the last as express will check above matches 
    res.render('error',{
    errormsg:'My 404 Page',
    name:'Swapnil Joshi'})
})

//consider website and its different section as below
//app.com
//app.com/help
//app.com/about

//to start up the server
//process of starting server is asyn 
app.listen(3000, ()=>{
    console.log('Server is up on 3000')
})
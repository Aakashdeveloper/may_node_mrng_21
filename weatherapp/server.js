var express = require('express');
var request = require('request');
var app = express()
var port = process.env.PORT ||  7800;


//static files
app.use(express.static(__dirname+'/public'));
//html
app.set('views', './src/views');
// view engine
app.set('view engine','ejs');


app.get('/weather/:city',function(req,res){
    var apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${req.params.city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    request(apiUrl,function(err,apiresponse){
        if(err) throw err;
        const output = JSON.parse(apiresponse.body)
        //res.send(output)
        res.render('index',{title:'Weather App',result:output})
    })
})

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
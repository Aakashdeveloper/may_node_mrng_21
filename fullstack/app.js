var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config()
var morgan = require('morgan');
var fs = require('fs');
var chalk = require('chalk');
var port = process.env.PORT || 9000;

var menu = [
    {link:'/',name:'Home'},
    {link:'/hotel',name:'Hotels'},
    {link:'/city',name:'City'}
]

var hotelRouter = require('./src/router/hotelRoutes')(menu);
var cityRouter = require('./src/router/cityRoutes');

//static File Path
app.use(express.static(__dirname+'/public'));
//html file
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.use(morgan('dev'))
app.use(morgan('dev', {stream: fs.createWriteStream('./app.log', {flags:'a'})}))

app.get('/',function(req,res){
    //res.send("Hi from express")
    res.render('index',{title:'Home Page',menu:menu})
})

app.use('/hotel',hotelRouter);
app.use('/city',cityRouter);

app.listen(port,function(err){
    if(err) throw err;
    else{
        console.log(chalk.blue("Server is running on port "+port))
    }
});
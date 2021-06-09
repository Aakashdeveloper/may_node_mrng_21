const express = require('express');
const app = express();
const port = process.env.PORT || 9700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name = "dashboard"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs')


app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')
});

//home
app.get('/',(req,res)=>{
    db.collection(col_name).find({isActive:true}).toArray((err,result) => {
        if(err) throw err;
        res.render('index',{data:result})
    })
})

//form
app.get('/new',(req,res)=>{
    res.render('admin')
})


//Read
app.get('/users',(req,res) => {
    var query = {}
    if(req.query.role && req.query.city){
        query={role:req.query.role,city:req.query.city,isActive:true}
    }
    else if(req.query.city){
        query={city:req.query.city,isActive:true}
    }
    else{
        query = {isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//userDetails on basis of id
app.get('/user/:id',(req,res) => {
    var id = mongo.ObjectID(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//Insert
app.post('/addUser',(req,res)=>{
    console.log(req.body)
    const data = {
        "name":req.body.name,
        "city":req.body.city,
        "phone":req.body.phone,
        "isActive":true,
        "role":req.body.role?req.body.role:'User'
    }
    db.collection(col_name).insert(data,(err,result) => {
        if(err) throw err;
        //res.send('Data Added')
        res.redirect('/')
    })
})

//update
app.put('/updateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
                name: req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                role: req.body.role,
                isActive: true
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})


//delete
app.delete('/deleteUser',(req,res)=> {
    db.collection(col_name).remove({_id:mongo.ObjectID(req.body._id)},(err,result)=>{
        if(err) throw err;
        res.send('Data Deleted')
    })
})

//softDelete(deactivate)
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
                isActive: false
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('User Deactivated')
        }
    )
})


//activate
app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
                isActive: true
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('User Activated')
        }
    )
})


//Db Connection
MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db= client.db('junenode');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})
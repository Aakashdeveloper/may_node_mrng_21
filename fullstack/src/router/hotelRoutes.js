var express = require('express')
var hotelRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
//var url = "mongodb://127.0.0.1:27017"
var url = "mongodb+srv://dev:test123@cluster0.f8vmc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//var url  =process.env.monogourl

function router(menu){

	hotelRouter.route('/')
	.get(function(req,res){
		mongodb.connect(url,function(err,dc){
			if(err){
				res.status(501).send("Error while connecting")
			}else{
				const dbo = dc.db('junenode');
				dbo.collection('hotels').find({}).toArray(function(err,data){
					if(err){
						res.status(501).send("Error while fetching")
					}else{
						//res.send(data)
						res.render('hotel',{title:'Hotels Page',hotelData:data,menu})
					}
				})
			}
		})
		
	})
	
	hotelRouter.route('/details/:id')
	.get(function(req,res){
		var {id} = req.params;
		mongodb.connect(url,function(err,dc){
			if(err){
				res.status(501).send("Error while connecting")
			}else{
				const dbo = dc.db('junenode');
				dbo.collection('hotels').findOne({id:id},function(err,data){
					if(err){
						res.status(501).send("Error while fetching")
					}else{
						res.render('hotelDetails',{title:`${data.name}`,details:data,menu})
					}
				})
			}
		})
		
	})

	return hotelRouter
}


module.exports = router
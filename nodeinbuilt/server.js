var http = require('http');

var server = http.createServer(function(req,res){
   res.write('<h1>Created First Node Server</h1>');
   res.end()
})

server.listen(1200);



/*
req > what ever we will send to the server 
    like form/params/queryparams
res > what server will respond
*/

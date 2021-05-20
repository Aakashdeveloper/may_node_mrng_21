var fs = require('fs');

/*
fs.writeFile('MyCode.txt',"Test fs package",function(err){
    if(err) throw err;
    console.log("File Created")
})



fs.appendFile("TextData.txt",'This is second line \n',function(err){
    if(err) throw err;
    console.log("File Appended")
})
*/

fs.readFile('db.json','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})




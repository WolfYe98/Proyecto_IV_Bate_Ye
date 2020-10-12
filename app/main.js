var http =require("http");
var Database = require("./database.js");
var db = new Database(__dirname+"/data/data.json");


http.createServer(function(req,res){
  res.end();
}).listen(3000);

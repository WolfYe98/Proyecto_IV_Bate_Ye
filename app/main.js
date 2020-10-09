var http =require("http");
var Database = require("./database.js");
var db = new Database(__dirname+"/data/data.json");


http.createServer(function(req,res){
  console.log(db.data);
  res.end();
}).listen(8080);

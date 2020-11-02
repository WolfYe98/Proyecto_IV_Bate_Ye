var http =require("http");
var Database = require("./database.js");
var db = new Database(__dirname+"/data/data.json");


http.createServer(function(req,res){
  res.write(JSON.stringify(db.data,null,4));
  db.getBodyPartArray("hiphop");
  res.end();
}).listen(3000);

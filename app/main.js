var http =require("http");
var Database = require("./database.js");
var db = new Database(__dirname+"/data/data.json");
var BodyPartLevel = require('./bodypartlevel.js')
var recommendation = require('./recommendation.js');

http.createServer(function(req,res){
  res.write(JSON.stringify(db.data,null,4));
  var n = new BodyPartLevel('piernas', 'hiphop');
  recommendation.recommendation([new BodyPartLevel('cadera', 2),new BodyPartLevel('pecho', 0)]);
  res.end();
}).listen(3000);

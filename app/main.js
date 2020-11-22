var http =require("http");
var Database = require("./database.js");
var db = new Database(__dirname+"/data/data.json");
var BodyPartLevel = require('./bodypartlevel.js')
var recommendation = require('./recommendation.js');
var fetch = require('node-fetch');
var consultarPrecioGeneral = require('./prices.js').consultarPrecioGeneral;
http.createServer(async function(req,res){
  //var url = "https://academies-pricing.vercel.app/api/academiesPricing";
  //var data = await fetch(url).then(resp=>resp.json()).then(data=>{return data});
  var data = await consultarPrecioGeneral();
  res.end(JSON.stringify(data));
}).listen(3000);

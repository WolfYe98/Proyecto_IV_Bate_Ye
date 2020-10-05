var http =require("http");

http.createServer(function(req,res){
  res.write("hola mundo!");
  res.end();
}).listen(8080);

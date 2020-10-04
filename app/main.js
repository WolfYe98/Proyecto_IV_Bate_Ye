var http =require("http");

http.createServer(function(req,res){
  res.write("HOLA MUNDO!");
  res.end();
}).listen(8080);

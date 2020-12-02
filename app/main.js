const fastify = require('fastify');
const Database = require("./database.js");
var db = new Database(undefined);
var Styles = require('./styles.js');
var styles = new Styles(db);
var recommendation = require('./recommendation.js');
var consultarPrecioGeneral = require('./prices.js').consultarPrecioGeneral;
var consultarPrecioCiudad = require('./prices.js').consultarPrecioCiudad;

var app = fastify({
  logger:{level:'error',prettyPrint:true}
});

//ruta para consultar todos los estilos.
app.get('/allstyles',(req,res)=>{
  res.send({
    styles:styles.getStyles()
  });
});

app.register(styleMiddleware);
//ruta para obtener un estilo en concreto y todas sus informaciones.
function styleMiddleware(app,options,done){
  app.addHook('preHandler',async (req,res)=>{
    if(req.params.styleName != undefined){
      if(req.params.styleName == ''){
        req.log.error('No styleName passed to /style!');
      }
    }
    if(req.params.cityName != undefined){
      if(req.params.cityName == ''){
        req.log.error('No cityName passed to /city!');
      }
    }
    if(req.params.founderName != undefined){
      if(req.params.founderName == ''){
        req.log.error('No founderName passed to /founder!');
      }
    }
  });
  app.addHook('onSend',async (req,res)=>{
    if(res.statusCode == 404){
      res.log.error('404 resource not found error');
    }
  });
  app.get('/style/:styleName',(req,res)=>{
    try{
      var st = styles.getStyleByName(req.params.styleName);
      res.code(200);
      res.send({style:st});
    }catch(err){
      res.code(404);
      res.send({
        statusCode: res.statusCode,
        message:'Style Not Found'
      });
    }
  });
  //Ruta para obtener estilos en cada ciudad.
  app.get('/city/:cityName',(req,res)=>{
    try{
      var st = styles.getStylesByCity(req.params.cityName);
      res.code(200);
      res.send({styles:st});
    }catch(err){
      res.code(404);
      res.send({
        statusCode: res.statusCode,
        message:'City Not Found'
      });
    }
  });

  //Ruta que recibe el nombre de un fundador y devuelve el estilo que ha creado.
  app.get('/founder/:founderName',(req,res)=>{
    try{
      var st = styles.getStyleByFounder(req.params.founderName);
      res.code(200);
      res.send({styles:st});
    }catch(err){
      console.log(err);
      res.code(404);
      res.send({
        statusCode: res.statusCode,
        message:'Founder Not Found'
      });
    }
  });

  done();
}

//Ruta para eliminar un estilo.


app.listen(3000,(err)=>{
  if(err){
    console.log(err);
    throw err;
    process.exit(1);
  }
  console.log('Success!');
});

const fastify = require('fastify');
const Database = require("./database.js");
const BodyPartLevel = require('./bodypartlevel.js');
var db = new Database(undefined);
var Styles = require('./styles.js');
var styles = new Styles(db);

var recommendation = require('./recommendation.js').recommendation;
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

//Registrar el hook que he creado.
app.register(styleHook);

//ruta para obtener un estilo en concreto y todas sus informaciones.
function styleHook(app,options,done){
  //Si falta algún parámetro, loggeo el error.
  app.addHook('preHandler',async (req,res)=>{
    if(req.params.styleName != undefined){
      if(req.params.styleName == ''){
        req.log.error('No style name passed to /style!');
        res.code(404);
        res.send({
          statusCode: res.statusCode,
          message:'No style name passed to the route /style'
        });
      }
    }
    if(req.params.cityName != undefined){
      if(req.params.cityName == ''){
        req.log.error('No cityName passed to /city!');res.code(404);
        res.send({
          statusCode: res.statusCode,
          message:'No city name passed to the route /city'
        });
      }
    }
    if(req.params.founderName != undefined){
      if(req.params.founderName == ''){
        req.log.error('No founder name passed to /founder!');
        res.code(404);
        res.send({
          statusCode: res.statusCode,
          message:'No founder name passed to the route /founder'
        });
      }
    }
    if(req.params.city != undefined){
      if(req.params.city == ''){
        req.log.error('No city passed to /prices!');
        res.code(404);
        res.send({
          statusCode: res.statusCode,
          message:'No city passed to the route /prices'
        });
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

  app.get('/prices/:city',async (req,res)=>{
    var obj = await consultarPrecioCiudad(req.params.city);
    if(obj.status == 200){
      res.code(200);
      res.send({
        statusCode: res.statusCode,
        price:obj
      });
    }
    else{
      res.code(404);
      res.send({
        statusCode: res.statusCode,
        message:'City not included at prices lists'
      });
    }
  });
  done();
}

//Ruta para consultar precios de un estilo.
app.get('/prices',async (req,res)=>{
  var obj = await consultarPrecioGeneral();
  if(obj.includedCities != undefined){
    res.code(404);
    res.send({
      statusCode:res.statusCode,
      message:'Not prices found'
    });
  }
  else{
    res.code(200);
    res.send({
      prices:obj
    });
  }
});

//Hook y ruta que recomiendan estilos de baile.
app.register(recommendationHook);

async function recommendationHook(app,options,done){
  app.addHook('preValidation',(req,res,done)=>{
    var keys = Object.keys(req.query);
    if(keys.length == 0){
      req.log.error('Not body parts passed to the request');
      res.code(400);
      res.send({
        statusCode:res.statusCode,
        message:'Not body parts passed to the request'
      });
    }
    done();
  });
  app.get('/recommendation',async (req,res)=>{
    var parts = req.query;
    var bodyNames = Object.keys(parts);
    var bparray =[];
    for(var i = 0; i < bodyNames.length; i++){
      var bp = new BodyPartLevel(bodyNames[i],parseInt(parts[bodyNames[i]]));
      bparray.push(bp);
    }
    var ret = await recommendation(bparray);
    res.code(200);
    res.send({
      recommendedStyles:ret
    });
  });

  done();
}

app.listen(3000,(err)=>{
  if(err){
    console.log(err);
    throw err;
    process.exit(1);
  }
  console.log('Success!');
});

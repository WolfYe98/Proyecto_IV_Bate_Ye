const fastify = require('fastify');
const Database = require("./database.js");
const BodyPartLevel = require('./bodypartlevel.js');
var db = new Database(undefined);
var Styles = require('./styles.js');
var styles = new Styles(db);
var recommendation = require('./recommendation.js').recommendation;
var consultarPrecioGeneral = require('./prices.js').consultarPrecioGeneral;
var consultarPrecioCiudad = require('./prices.js').consultarPrecioCiudad;
var exportConfig = require('./config.js')
//Building application instance
async function build(opts={}){
  var configurations = await exportConfig();
  var app = fastify(opts);

  //ruta para consultar todos los estilos
  app.get('/allstyles',(req,res)=>{
    res.code(200);
    res.type('application/json');
    res.send({
      styles:styles.getStyles()
    });
  });

  //Registrar el hook que he creado.
  app.register(styleHook);

  //rutas para obtener un estilo en concreto y toda su informacion.
  function styleHook(app,options,done){
    //Si falta algún parámetro, loggeo un mensaje de error.
    app.addHook('preHandler',async (req,res)=>{
      if(req.params.styleName != undefined){
        if(req.params.styleName == ''){
          //Muestro por pantalla este log con el mensaje personalizado
          req.log.info('req does not pass any style name passed to /style!');
          res.code(400);
          res.type('application/json');
          res.send({
            statusCode: res.statusCode,
            message:'req does not pass any style name passed to the route /style'
          });
        }
      }
      if(req.params.cityName != undefined){
        if(req.params.cityName == ''){
          //Muestro por pantalla este log con el mensaje personalizado
          req.log.info('req does not pass any cityName passed to /city!');
          res.code(400);
          res.type('application/json');
          res.send({
            statusCode: res.statusCode,
            message:'No city name passed to the route /city'
          });
        }
      }
      if(req.params.founderName != undefined){
        if(req.params.founderName == ''){
          //Muestro por pantalla este log con el mensaje personalizado
          req.log.info('req does not pass any founder name passed to /founder!');
          res.code(400);
          res.type('application/json');
          res.send({
            statusCode: res.statusCode,
            message:'No founder name passed to the route /founder'
          });
        }
      }
      if(req.params.city != undefined){
        if(req.params.city == ''){
          //Muestro por pantalla este log con el mensaje personalizado
          req.log.info('req does not pass any city passed to /prices!');
          res.code(400);
          res.type('application/json');
          res.send({
            statusCode: res.statusCode,
            message:'No city passed to the route /prices'
          });
        }
      }
    });
    app.get('/style/:styleName',(req,res)=>{
      try{
        var st = styles.getStyleByName(req.params.styleName);
        res.code(200);
        res.type('application/json');
        res.send({style:st});
      }catch(err){
        res.code(404);
        res.type('application/json');
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
        res.type('application/json');
        res.send({styles:st});
      }catch(err){
        res.code(404);
        res.type('application/json');
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
        res.type('application/json');
        res.send({styles:st});
      }catch(err){
        console.log(err);
        res.code(404);
        res.type('application/json');
        res.send({
          statusCode: res.statusCode,
          message:'Founder Not Found'
        });
      }
    });

    //Ruta para consultar precios de las academias
    app.get('/prices/:city',async (req,res)=>{
      var obj = await consultarPrecioCiudad(req.params.city);
      if(obj.status == 200){
        res.code(200);
        res.type('application/json');
        res.send({
          statusCode: res.statusCode,
          price:obj
        });
      }
      else{
        res.code(404);
        res.type('application/json');
        res.send({
          statusCode: res.statusCode,
          message:'City not included at prices lists'
        });
      }
    });
    done();
  }

  app.get('/generalPrices',async (req,res)=>{
    var obj = await consultarPrecioGeneral();
    if(obj.statusCode != 200){
      res.code(404);
      res.type('application/json');
      res.send({
        statusCode:res.statusCode,
        message:'Not prices found'
      });
    }
    else{
      res.code(200);
      res.type('application/json');
      res.send({
        prices:obj
      });
    }
  });

  //Hook y ruta que recomiendan estilos de baile.
  app.register(recommendationHook);

  async function recommendationHook(app,options,done){
    app.addHook('preHandler',(req,res,next)=>{
      var keys = Object.keys(req.query);
      if(keys.length == 0){
        //Muestro por pantalla este log con el mensaje personalizado
        req.log.info('req does not pass any body parts passed to the request');
        res.code(400);
        res.type('application/json');
        res.send({
          statusCode:res.statusCode,
          message:'Not body parts passed to the request'
        });
      }
      next();
    });

    //Ruta para recomendar estilos.
    app.get('/recommendation',async (req,res)=>{
      var parts = req.query;
      var bodyNames = Object.keys(parts);
      var bparray =[];
      for(var i = 0; i < bodyNames.length; i++){
        var bp = new BodyPartLevel(bodyNames[i],parseInt(parts[bodyNames[i]]));
        bparray.push(bp);
      }
      var ret = await recommendation(bparray);
      if(ret.length >0){
        res.code(200);
        res.type('application/json');
        res.send({
          statusCode: res.statusCode,
          recommendedStyles:ret
        });
      }
      else{
        res.code(404);
        res.type('application/json');
        res.send({
          statusCode:res.statusCode,
          message:'The body parts you pass, are not right body parts names'
        })
      }
    });

    done();
  }

  //add, update and delete some styles.
  app.register(userHook);
  //Añadido rutas para añadir, modificar o eliminar un estilo
  function userHook(app,options,done){
    app.addHook('preHandler',(req,res,next)=>{
      if(req.body.key == undefined){
        //Muestro por pantalla este log con el mensaje personalizado
        req.log.info('request without user key');
        res.code(401);
        res.type('application/json');
        res.send({
          statusCode: res.statusCode,
          message: 'Only users with a key can add/modifie/delete an style'
        });
      }
      else{
        //Usando configuración externa para comparar las claves introducidas
        if(req.body.key != (configurations.key).toString()){
          req.log.info('request key wrong');
          res.code(403);
          res.type('application/json');
          res.send({
            statusCode: res.statusCode,
            message: 'You have not permission to add/modifie/delete an style'
          });
        }
        else{
          if(req.method == 'POST'){
            var sts = styles.getStyles();
            if(req.body.updateStyle == undefined || (req.body.updateStyle != undefined && req.body.updateStyle == '')){
              req.log.info('styleName does not exists');
              res.code(400);
              res.type('application/json');
              res.send({
                statusCode: res.statusCode,
                message: 'You have not pass any styleName'
              });
            }
          }
          else if(req.method == 'DELETE'){
            if(req.params.deleteStyleName == undefined || (req.params.deleteStyleName != undefined && req.params.deleteStyleName == '')){
              req.log.info('request does not pass any style to /deleteStyle');
              res.code(400);
              res.type('application/json');
              res.send({
                statusCode: res.statusCode,
                message: `You have not pass any style`
              });
            }
          }
        }
      }
      next();
    });

    app.put('/addstyle',(req,res)=>{
      if(req.body.newStyle != undefined){
        var ns = req.body.newStyle;
        try{
          styles.addStyle(ns.name, parseInt(ns.year), ns.founder, ns.city, ns.history, ns.description, ns.body);
          res.code(201);
          res.type('application/json');
          res.send({
            statusCode:res.statusCode,
            message:`Style ${ns.name} added`
          });
        }catch(err){
          console.log(err);
          res.code(400);
          res.type('application/json');
          res.send({
            statusCode:res.statusCode,
            message:'This style is already added or some parameters are not correct'
          });
        }
      }
    });

    app.post('/updateStyle',(req,res)=>{
      var uStyle = req.body.updateStyle;
      try{
        styles.updateStyle(uStyle.styleName, uStyle.styleInformation);
        res.code(200);
        res.type('application/json');
        res.send({
          statusCode:res.statusCode,
          message:`Style ${uStyle.styleName} updated`
        })
      }catch(err){
        console.log(err);
        res.code(404);
        res.type('application/json');
        res.send({
          statusCode:res.statusCode,
          message:'Style may not be added yet'
        });
      }
    });

    app.delete('/deleteStyle/:deleteStyleName',(req,res)=>{
      try{
        styles.deleteStyle(req.params.deleteStyleName);
        res.code(200);
        res.type('application/json');
        res.send({
          statusCode:res.statusCode,
          message:`Style: ${req.params.deleteStyleName} deleted`
        })
      }catch(err){
        console.log(err);
        res.code(404);
        res.type('application/json');
        res.send({
          statusCode:res.statusCode,
          message:'Style may not be in the database'
        });
      }
    });

    done();
  }
  return app
}

//Exporting build function
module.exports = build;

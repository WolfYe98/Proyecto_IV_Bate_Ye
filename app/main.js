const fastify = require('fastify');
const Database = require("./database.js");
const BodyPartLevel = require('./bodypartlevel.js');
var db = new Database(undefined);
var Styles = require('./styles.js');
var styles = new Styles(db);

var recommendation = require('./recommendation.js').recommendation;
var consultarPrecioGeneral = require('./prices.js').consultarPrecioGeneral;
var consultarPrecioCiudad = require('./prices.js').consultarPrecioCiudad;

//Building application instance
function build(opts={}){
  var app = fastify(opts);

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
    if(obj.statusCode != 200){
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
    app.addHook('preHandler',(req,res,next)=>{
      var keys = Object.keys(req.query);
      if(keys.length == 0){
        req.log.error('Not body parts passed to the request');
        res.code(400);
        res.send({
          statusCode:res.statusCode,
          message:'Not body parts passed to the request'
        });
      }
      next();
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
      if(ret.length >0){
        res.code(200);
        res.send({
          statusCode: res.statusCode,
          recommendedStyles:ret
        });
      }
      else{
        res.code(404);
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

  function userHook(app,options,done){
    app.addHook('preHandler',(req,res,next)=>{
      if(req.body.key == undefined){
        req.log.error('Only users with a key can add/modifie/delete an style');
        res.code(401);
        res.send({
          statusCode: res.statusCode,
          message: 'Only users with a key can add/modifie/delete an style'
        });
      }
      else{
        if(req.body.key != '19980930'){
          req.log.error('Wrong key');
          res.code(403);
          res.send({
            statusCode: res.statusCode,
            message: 'You have not permission to add/modifie/delete an style'
          });
        }
        else{
          if(req.method == 'POST'){
            var sts = styles.getStyles();
            if(req.body.updateStyle != undefined){
              if(req.body.updateStyle.styleName != undefined){
                var name = req.body.updateStyle.styleName;
                name = name.replace(' ','');
                name = name.toLowerCase();
                if(!sts.includes(name)){
                  req.log.error('Style not founded');
                  res.code(404);
                  res.send({
                    statusCode: res.statusCode,
                    message: `The style ${name} is not included in our database`
                  });
                }
              }
              else{
                req.log.error('styleName does not exists');
                res.code(400);
                res.send({
                  statusCode: res.statusCode,
                  message: 'You have not pass any styleName'
                });
              }
            }
            else{
              req.log.error('No style passed');
              res.code(400);
              res.send({
                statusCode: res.statusCode,
                message: `You have not pass any style`
              });
            }
          }
          else if(req.method == 'DELETE'){
            if(req.params.deleteStyleName == undefined){
              req.log.error('No style passed');
              res.code(400);
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
          res.send({
            statusCode:res.statusCode,
            message:`Style ${ns.name} added`
          });
        }catch(err){
          console.log(err);
          res.code(400);
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
        res.send({
          statusCode:res.statusCode,
          message:`Style ${uStyle.styleName} updated`
        })
      }catch(err){
        console.log(err);
        res.code(404);
        res.send({
          statusCode:res.statusCode,
          message:'Style may not be added yet'
        });
      }
    });

    app.delete('/deleteStyle/:deleteStyleName',(req,res)=>{
      try{
        styles.deleteStyle(req.params.deleteStyleName);
      }catch(err){
        console.log(err);
        res.code(404);
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

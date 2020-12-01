const fastify = require('fastify');
const Database = require("./database.js");
var db = new Database(undefined);
var Styles = require('./styles.js');
var styles = new Styles(db);
var recommendation = require('./recommendation.js');
var consultarPrecioGeneral = require('./prices.js').consultarPrecioGeneral;
var consultarPrecioCiudad = require('./prices.js').consultarPrecioCiudad;

var app = fastify();

//ruta para consultar todos los estilos.
app.get('/allstyles',(req,res)=>{
  res.send({
    styles:styles.getStyles()
  });
});

//ruta para obtener un estilo en concreto y todas sus informaciones.
app.get('/style/:styleName',(req,res)=>{
  try{
    var st = styles.getStyleByName(req.params.styleName);
    res.code(200);
    res.send({style:st});
  }catch(err){
    console.log(err);
    res.code(404);
    res.send({
      statusCode: res.statusCode,
      message:'Not found'
    });
  }
});

//Ruta para obtener estilos en cada ciudad.

app.listen(3000,(err)=>{
  if(err){
    console.log(err);
    throw err;
    process.exit(1);
  }
  console.log('Success!');
});

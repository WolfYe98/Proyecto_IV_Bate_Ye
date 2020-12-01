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
    console.log(err);
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
    var st = styles.getStylesByFounder(req.params.founder);
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

//Ruta para eliminar un estilo.


app.listen(3000,(err)=>{
  if(err){
    console.log(err);
    throw err;
    process.exit(1);
  }
  console.log('Success!');
});

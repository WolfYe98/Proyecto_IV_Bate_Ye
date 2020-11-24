var BodyPartLevel = require('./bodypartlevel.js');
var fetch = require('node-fetch');
/**
* @function recommendation
* @summary Función que devuelve cual sería el estilo más recomendable según las partes del cuerpo que les han pasado
* @author Bate Ye
* @param {Array} bodyParts Es un array de objetos de BodyPartLevel, indican qué partes del cuerpo y que nivel de uso suele tener el usuario de esas partes.
* @return {Array} array Es un array de los estilos que el api te recomienda empezar.
*/
async function recommendation(bodyParts){
  var URL = 'https://dancinform-recomendation.netlify.app/.netlify/functions/recomendacion';
  var i = 0;
  URL = URL+'?'+bodyParts[0].getBodyPart()+'='+bodyParts[0].getUseLevel().toString();
  for(i = 1; i < bodyParts.length; i++){
    URL += '&'+bodyParts[i].getBodyPart()+'='+bodyParts[i].getUseLevel().toString();
  }
  var obj = await fetch(URL).then(res=>res.json()).then(datos=>{return datos}).catch(err=>console.log(err));
  var keysObject = Object.keys(obj);
  var array = [];
  for(i = 0; i < keysObject.length;i++){
    array.push(keysObject[i]);
  }
  return array;
}


exports.recommendation = recommendation;

var BodyPartLevel = require('./bodypartlevel.js');
/**
* @function recommendation
* @summary Función que devuelve cual sería el estilo más recomendable según las partes del cuerpo que les han pasado
* @author Bate Ye
* @param {Array} bodyParts Es un array de objetos de BodyPartLevel, indican qué partes del cuerpo y que nivel de uso suele tener el usuario de esas partes.
*/
function recommendation(bodyParts){
  var bp = new BodyPartLevel('cadera', 10);
  var bpsIntensity = bp.getStyleBodyPartIntensity();
  var styles = Object.keys(bpsIntensity);
  var recommendStyles =[];

  styles.forEach(function (element, index, array){
    var obj = {};
    obj[element] = 0;
    recommendStyles.push(obj);
  });
  if(typeof bodyParts === 'object'){
    bodyParts.forEach(function(element,index,array){
      styles.forEach(function(e,i,a){
        if(bpsIntensity[e] != undefined){
          if(element.getBodyPart() in bpsIntensity[e]){
            if(element.getUseLevel() >= bpsIntensity[e][element.getBodyPart()]){
              var i;
              for(i = 0; i < recommendStyles.length; i++){
                if(Object.keys(recommendStyles[i]) == e){
                  recommendStyles[i][e] = recommendStyles[i][e]+1;
                }
              }
            }
          }
        }
      });
    });
  }
  var max = recommendStyles[0];
  var k = Object.keys(recommendStyles[0]);
  for(var i = 1; i < recommendStyles.length; i++){
    var s = Object.keys(recommendStyles[i]);
    if(max[k] < recommendStyles[i][s]){
      max = recommendStyles[i];
    }
  }
  return Object.keys(max)[0].toUpperCase();
}


exports.recommendation = recommendation;

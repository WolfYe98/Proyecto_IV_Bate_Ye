const levels = {
  hiphop:{
      cadera:3,
      piernas:2,
      pecho: 1,
      brazos: 1
  },
  krump:{
      brazos:3,
      piernas:3,
      pecho: 1,
      cadera: 1
  }
}
//Funcion desplegado en netlify
exports.handler = async function(event, context) {
  var partes;
  if(Object.keys(event.queryStringParameters).length > 0){
    partes = event.queryStringParameters;
  }
  else{
    partes = 'nothing';
  }
  if(typeof partes ==  'object'){
    var keysPartes = Object.keys(partes);
    var keyStyle = Object.keys(levels);
    var recomendados={};
    for(const s in levels){
      recomendados[s] = 0;
    }
    for(var i = 0; i < keysPartes.length; i++){
      for(var j = 0; j< keyStyle.length; j++){
        if(levels[keyStyle[j]][keysPartes[i]] <= parseInt(partes[keysPartes[i]])){
          recomendados[keyStyle[j]] += 1;
        }
      }
    }
    var max = 0;
    for(var x = 0; x < keyStyle.length; x++){
      if(recomendados[keyStyle[x]] > max){
        max = recomendados[keyStyle[x]];
      }
    }
    var retorno={};
    for(z = 0; z < keyStyle.length; z++){
      if(recomendados[keyStyle[z]] == max){
        retorno[z+1] = keyStyle[z];
      }
    }
    return{
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({recommendedStyle: retorno})
    };
  }
  else{
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({warningMessage:'This api is for recommend a dancing style, you have to give some bodyparts in spanish and their intensity'})
    };
  }
}

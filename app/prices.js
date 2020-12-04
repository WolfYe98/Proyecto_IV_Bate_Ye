const fetch = require('node-fetch');
const URL = 'https://academies-pricing.vercel.app/api/academiesPricing';

async function consultarPrecioGeneral(){
  var retorno = await fetch(URL).then(res => res.json()).then(datos =>{return datos});
  return retorno;
}
async function consultarPrecioCiudad(ciudad){
  var retorno;
  var urlConsulta = URL;
  if(ciudad != undefined){
    var aux_ciudad = ciudad.toString();
    urlConsulta = URL + '?city='+aux_ciudad;
  }
  retorno = await fetch(urlConsulta).then(res=>res.json()).then(datos => {return datos});
  if(retorno.includedCities != undefined){
    return {
      status: 404,
      fail:'Not included city',
      includedCities:retorno.includedCities
    };
  }
  else{
    retorno.status=200;
    return retorno;
  }
}

module.exports.consultarPrecioCiudad = consultarPrecioCiudad;
module.exports.consultarPrecioGeneral = consultarPrecioGeneral;

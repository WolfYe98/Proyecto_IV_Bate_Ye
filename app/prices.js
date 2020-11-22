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
    aux_ciudad = aux_ciudad.replaceAll(' ','%20');
    urlConsulta = URL + '?city='+aux_ciudad;
    console.log(urlConsulta);
  }
  retorno = await fetch(urlConsulta).then(res=>res.json()).then(datos => {return datos});
  console.log(retorno);
  if(retorno.includedCities != undefined){
    return {fail:'Not included city',includedCities:retorno.includedCities};
  }
  else{
    return retorno;
  }
}

module.exports.consultarPrecioCiudad = consultarPrecioCiudad;
module.exports.consultarPrecioGeneral = consultarPrecioGeneral;

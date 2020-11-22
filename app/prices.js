const fetch = require('node-fetch');
const URL = 'https://academies-pricing.vercel.app/api/academiesPricing';

async function consultarPrecioGeneral(){
  var retorno = await fetch(URL).then(res => res.json()).then()
}
async function consultarPrecioCiudades(ciudad){
  var retorno;
  var urlConsulta = URL;
  if(ciudad != undefined){
    var aux_ciudad = ciudad.replaceAll(' ','%20');
    urlConsulta = URL + '?city='+aux_ciudad;
  }
  retorno = await fetch(urlConsulta).then(res=>res.json()).then(datos => {return datos});
  if(retorno.includedCities != undefined){
    return {fail:'Not included city',includedCities:retorno.includedCities};
  }
  else{
    return retorno;
  }
}

# Integración de la función serverless desplegado en Vercel

Ya he hecho y desplegado una función y lo he desplegado en Vercel, ahora voy a integrarlo en mi proyecto.
Para eso he creado una función en mi proyecto que hace uso de la función desplegado para obtener datos de las academias.
El fichero de esta función lo tengo [aquí](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/prices.js).

## La función:
Esta función, realmente son dos funciones, la primera es ```consultarPrecioGeneral()```, esta función usa ```node-fetch```(una biblioteca que obtiene datos de un URL).
Esta función simplemente hace una petición a la URL de la función desplegado en Vercel, sin ningún parámetro, para que devuelva el micro-api desplegado en Vercel, un objeto JSON que contenga los datos de las ciudades y los precios mínimo, medio y máximo de cada ciudad:
```bash
  $ const URL = 'https://academies-pricing.vercel.app/api/academiesPricing';
  $ var retorno = await fetch(URL).then(res=>res.json()).then(datos=>{return datos})
```
Al final devuelve el objeto que contiene los precios.

La segunda función es ```consultarPrecioCiudad(ciudad)``` esta función recibe el nombre de una ciudad y modifica la URL para poner un parámetro ```city=ciudad```.
Esto lo hacen estas líneas:
```bash
  $ var urlConsulta = URL;
  $ if(ciudad != undefined){
    var aux_ciudad = ciudad.toString();
    urlConsulta = URL + '?city='+aux_ciudad;
  }
```
Una vez que tengamos la URL con el parámetro para consultar una ciudad, obtenemos los datos con:
```bash
  $ retorno = await fetch(urlConsulta).then(res=>res.json()).then(datos => {return datos})
```
Al final, compruebo si la ciudad que he consultado está en el micro-api de Vercel, si está lo devuelvo y si no está devuelvo un objeto con un mensaje de que la ciudad que busco no está en el micro-api, y una lista de ciudades incluidas en el micro-api.

[Aquí están los tests de la función](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/test/database-chai.js).
Esta función ha avanzado estos issues e historias de usuario:
  - https://github.com/WolfYe98/Proyecto_IV_Bate/issues/23
  - https://github.com/WolfYe98/Proyecto_IV_Bate/issues/24

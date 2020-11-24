# Función Serverless desplegado en Vercel:

## La idea:
La idea de esta función, es básicamente recibir por petición GET una ciudad y devolver una lista de precios de las 3-4 academias de danza más conocidas de la ciudad, en caso de no recibir ninguna ciudad, devolvemos un json con los precios de las academias más baratas, más caras y el precio medio de cada ciudad que dispongamos.

## Vercel:
Para desplegarlo, he importado el repositorio de mi proyecto a Vercel, y en la página, he seleccionado que el directorio raíz que contiene mi código de la función serverless es [aquí](https://github.com/WolfYe98/Proyecto_IV_Bate/tree/master/Vercel/Academies-pricing).
También lo puedes hacer desde la terminal, simplemente usando el comando ```vercel```, te irá preguntando una serie de configuraciones como que comando quieres usar para ejecutar la función, en qué directorio se encuentra la función etc.

## La función:
Vercel ejecuta la función que hayas exportado, la función tendrá 2 parámetros req y res, (request, response).
Son objetos tipo JSON.
En req, están los objetos relacionados con la petición, como puede ser req.query que guarda los parámetros de la petición.
En res devuelven la respuesta a la petición.

Send y json son las dos funciones que proporcionan res para devolver la petición, según [este enlace](https://www.tutorialspoint.com/difference-between-res-send-and-res-json-in-express-js) la diferencia entre ellos es que ponen la cabecera con diferentes ```Content-Type```.
Yo lo he probado con ```curl -I URL``` y sí cambian la cabecera, pero por seguridad, he hecho ```res.setHeader('Content-Type','application/json')```.

La URL de la función desplegado es [este](http://academies-pricing.vercel.app/api/academiesPricing).

En [este fichero](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/prices.js) se puede ver como utilizo esta función serverless.

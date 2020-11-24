# Función Serverless desplegado en Netlify:

## La idea:
La idea de esta función, es que un usuario le pasa una serie de partes de su cuerpo junto con la intensidad (entre 0-4) que suele trabajar o quiere trabajarlo en un futuro esa parte, y la función le devuelve los estilos que más le encajaría.

## Netlify local:
Netlify al igual que Vercel, se puede usar localmente antes de desplegarlo, para eso, necesitamos instalar el cli de Netlify con:
```bash
 $ npm install netlify-cli -g
```

Y para ejecutarlo localmente, vamos al directorio raíz de la función, y ejecutamos el comando ```netlify dev```.

## La función:
[He seguido estos pasos para implementar la función](https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format).
Uso una función asíncrona (async), que tiene dos parámetros ```event``` y ```context```.
En ```event``` se encuentran los objetos que contienen nuestra petición, más concretamente en ```event.queryStringParameters```, que es un objeto tipo JSON y contiene los parámetros como por ejemplo las partes del cuerpo junto con su intensidad.

La función coge los parámetros, lo procesa y retorna un objeto json que tienen:
El statusCode que es el [código de estado http](https://developer.mozilla.org/es/docs/Web/HTTP/Status).
El header que indico aquí el [tipo MIMIE](https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) de mi respuesta.
Y un body que tiene un string de un json que voy a devolver.


La URL de esta función desplegado en Netlify es [esta](https://dancinform-recomendation.netlify.app/.netlify/functions/recomendacion).

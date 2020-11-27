# Función Serverless desplegado en Netlify:

## Despliegue:
Para el despliegue de una función Serverless en Netlify, he seguido estos pasos:
  - Primero me he registrado en la página con mi cuenta de Github.
  - Una vez registrado he importado el repositorio donde se encuentra la función que quiero desplegar, seleccionando en ```New site from Git```.
  [Imagen](imagenes/importarBotonNetlify).
  - Después de darle a ```New site from Git```, he seleccionado que el repositorio lo importaré desde Github.
  [Imagen](imagenes/seleccionarGithubNetlify).
  - Selecciono el repositorio que quiero importar, luego selecciono quien es el propietario y a que rama tendré que hacer un push para el auto-despliegue:
  [Imagen](imagenes/ultimoPasoImportarNetlify).
  - Una vez importado, tengo en mi repositorio un fichero netlify.toml que indica cuál será el directorio base de la función que quiero desplegar (como tengo netlify.toml, no es necesario que lo configure desde la página).
  [Este fichero](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/netlify.toml) es el fichero que indica cuál es el directorio base de mi función.
  Base indica a Netlify que antes de empezar a construir, tiene que cambiarse al directorio indicado allí.
  - El fichero anterior indica el directorio base, ahora en el directorio base, tengo otro netlify.toml que indica en qué directorio se encuentra la función que quiero desplegar.
  [Netlify.toml que indica el directorio de la función](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Netlify/Recommendation/netlify.toml).

## La idea de la función:
La idea de esta función, es que un usuario le pasa una serie de partes de su cuerpo junto con la intensidad (entre 0-4) que suele trabajar o quiere trabajarlo en un futuro esa parte, y la función le devuelve los estilos que más le encajaría.

## La función:
En Netlify, las funciones que queremos que se despliegue hay que exportarlos como ```handler```:
```bash
  $ exports.handler = async function(event, context) {}
```
El parámetro ```event``` que recibe la función, es un objeto que contendrá los parámetros de la petición.
En cuanto empiece la función, compruebo que hay algún parámetros en ```event.queryStringParameters``` que es donde guardan los parámetros de la petición:
```bash
  $ if(Object.keys(event.queryStringParameters).length > 0){}
```
  - Si hay parámetros, los guardo como partes de un cuerpo:
    ```bash
      $ partes = event.queryStringParameters
    ```
    Luego, extraigo las partes de los cuerpos y su valor (es como la intensidad que se usa cada parte del cuerpo), y para cada valor de las partes introducidas que sean mayor que los valores de los estilos de los datos que tenemos, sumo un punto a dicho estilo (habiendo metido todos los estilos en un objeto de forma {nombreEstilo:valor}).
    Al final, saco los estilos que tienen mayores puntuaciones, los guardo en un objeto, y los devuelvo de esta forma:
    ```bash
      $ return{
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({recommendedStyle: retorno})
      };
    ```
    El ```statusCode: 200``` indica que el código de estado que voy a devolver es el 200, ```headers: {'Content-Type': 'application/json'}``` configura que el tipo del contenido es JSON, y body es el mensaje de respuesta que devuelvo, en este caso, son los estilos más recomendados.
  - Si no hay parámetros, devuelvo un mensaje de que esta función necesita recibir parámetros:
    ```bash
      $ return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({warningMessage:'This api is for recommend a dancing style, you have to give some bodyparts in spanish and their intensity'})
      };
    ```
La URL de esta función desplegado en Netlify es: https://dancinform-recomendation.netlify.app/.netlify/functions/recomendacion

El fichero de la función es [este](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Netlify/Recommendation/functions/recomendacion.js).

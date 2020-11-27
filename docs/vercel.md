# Función Serverless desplegado en Vercel:

### Despliegue:
Para desplegar la función en Vercel y que haga los despliegues automáticamente cuando realices un push en mi repositorio de Github, he seguido estos pasos:
  - Me he registrado en Vercel con mi cuenta de Github.
  [Imagen](imagenes/registroVercel.png)
  - Después de registrarme, he importado el proyecto donde tengo el código de la función que quiero desplegar a Vercel, dandole al botón de Import Project.
  [Imagen](imagenes/importarVercel.png)
  - En la sección de Importar Proyecto, he introducido la URL de mi repositorio del proyecto.
  [Imagen](imagenes/urlGitHubVercel.png)
  - Me piden ahora que le indique donde está la carpeta que se encuentra nuestra función a desplegar (directorio root), lo seleccionamos y continuamos.
  [Imagen](imagenes/rootAcademiesVercel.png)
  - He dejado el FRAMEWORK PRESET y Build and Output Settings por defecto ya que no utilizo ningún Framework y mi proyecto usa el build command por defecto. Tampoco me ha sido necesario definir Variables de Entorno por ahora.
  [Imagen](imagenes/presetBuildVercel.png)
  - Ya tendríamos nuestra función desplegado en Vercel.
  [Imagen](imagenes/deployedVercel.png)
  - Para que Vercel auto-despliegue nuestra función cada vez que realicemos un push a mi rama principal de mi repositorio de Github, he seleccionado la función desplegado en Vercel y he ido a Settings -> Git, he chequeado que el repositorio de Github conectado es el repositorio de mi proyecto (Proyecto_IV_Bate), y debajo, en Production Branch, puedo seleccionar la rama en la que quiero que cuando haga push, se autodespliegue mi función en Vercel, por defecto estaba en ```main```, pero mi rama principal se llama master, así que en Select Branch he escogido la opción de Custom (para indicar la rama que quiero), y de Branch Name he puesto ```master```.
  Ahora cada vez que realizo un push a la rama ```master``` de mi repositorio Proyecto_IV_Bate, se auto-desplegará la función serverless.
  [Imagen](imagenes/settingGitVercel.png)
  [Imagen](imagenes/connectGitRepository.png)
  [Imagen](imagenes/productionBranch.png)

  - Puedo hacer despliegues desde mi local también, de manera que tengo que ir primero al directorio donde se encuentra mi función, descargar el CLI Vercel y luego ejecutar Vercel (estando en el directorio root del local).
  Al ejecutar por primera vez ```vercel``` en mi directorio local de la función, me ha preguntado una serie de preguntas, pero como ya lo tenía configurado todo desde la página de Vercel, simplemente he ido dandole a Enter para seleccionar la selección por defecto, y me lo configura automáticamente todo (como enlazar el local con el proyecto de Vercel, elegir el usuario que quiero enlazarlo, el directorio root).
  [Imagen](imagenes/localVercel.png)
  - Para desplegar la función desde el local sin push al repositorio de Git, puedes usar como bien dice arriba en la imagen, este comando: ```vercel --prod```.


## La idea de la función:
La idea de esta función, es básicamente recibir por petición GET una ciudad y devolver una lista de precios de las 3-4 academias de danza más conocidas de la ciudad, en caso de no recibir ninguna ciudad, devolvemos un json con los precios de las academias más baratas, más caras y el precio medio de cada ciudad que dispongamos.

## La función:
[Aquí puedes encontrar el código de mi función](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Vercel/Academies-pricing/api/academiesPricing.js).
Vercel ejecuta la función que hayas exportado, la función tendrá 2 parámetros req y res, (request, response).
Esta línea, indica que exporto una función: ```module.exports = (req, res) => {}```
req (request), es un objeto que contendrá la información de la petición que han hecho a mi función, en req.query encuentro los parámetros que han pasado.
Mi función, para empezar importa una serie de datos desde ```prices.js```, (```prices.js``` exporta un objeto tipo JSON que tiene los datos que necesito para realizar las operaciones en mi función).
Obtengo los datos que necesito con: ```var data = require('./prices.js')```
Estos datos contienen pares clave:valor de las ciudades con los precios de las academias más famosas, las claves son los nombres de las ciudades, y los valores son objetos que tienen como clave nombres de las academias y como valores tienen los precios al mes de cada academia.

Después de obtener los datos, obtengo el nombre de todas las ciudades que estén en los datos, compruebo si el en la petición que nos han hecho, han introducido una ciudad o no, con esta línea: ```if(req.query.city == undefined){}```.
Como bien he dicho antes, ```req.query``` es un objeto tipo JSON que contiene los parámetros de la petición, entonces si quiero buscar si han puesto un parámetro o no, bastaría con buscarlo si dicho parámetro existe o no en ```req.query```.
  - Si no existe el parámetro ```city``` en  ```req.query```, entonces devuelvo los precios: mínimo, medio y máximo de todas las ciudades.
  Para eso, recorro todos los objetos de datos, calculo los precios y los guardo en un objeto que más tarde, lo devolvería en ```res```, que es la respuesta a las peticiones.
  - Si el parámetro ```city``` existe, compruebo que el valor de dicho parámetro (el nombre de la ciudad), está o no en los datos que tengo:
  ```bash
  $  if(keys.includes(nombre_ciudad)){}
  ```
    - Si existe la ciudad en los datos, en el objeto que voy a devolver introduzco dicha ciudad con los precios de su academia.
    - Si no existe la ciudad en los datos, en el objeto que voy a devolver introduzco los nombres de las ciudades que tengo información.

Al final, con ```res```(response), devuelvo una respuesta, la respuesta devolverá un objeto de tipo JSON, entonces con ```res.setHeader('Content-Type','application/json')```indico que la el tipo del contenido va a ser JSON, y con ```res.status(200).json(obj)``` devuelvo el objeto.
(Send y json son las dos funciones que proporcionan res para devolver la petición, según [este enlace](https://www.tutorialspoint.com/difference-between-res-send-and-res-json-in-express-js) la diferencia entre ellos es que ponen la cabecera con diferentes ```Content-Type```.
Yo lo he probado con ```curl -I URL``` y sí cambian la cabecera, pero por seguridad, he hecho ```res.setHeader('Content-Type','application/json')```).

La URL de la función desplegado es [este](http://academies-pricing.vercel.app/api/academiesPricing).

En [este fichero](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/prices.js) se puede ver como utilizo esta función serverless.

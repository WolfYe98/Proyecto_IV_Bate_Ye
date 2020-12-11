# API

## Rutas:

Para mi API, he definido varias rutas, ajustándolo a cada Historia de Usuario.
El fichero de las rutas es [este](../app/main.js), y los tests están [aquí](../test/routes-chai.js)

### HU1:

Para la [HU1](https://github.com/WolfYe98/Proyecto_IV_Bate/issues/23) he definido dos rutas:

  - ```app.get('prices/:city',handler)```: que recibe el nombre de una ciudad, y devuelve los precios de las academias de dicha ciudad con el tipo ```application/json``` y el código 200 si la ciudad está en la base de datos, en caso contrario, devuelve un json con un mensaje y el código 404. Esta ruta también tiene un hook como los anteriores, que mira primero si la ciudad que le ha pasado es correcto (que no esté el parámetro vacío), y si es correcto pasa a la ejecución del handler, y en caso contrario se crea un log y se devuelve al cliente un mensaje de recurso no encontrado con código 400 indicando que la petición no es correcta.

  - ```app.get('generalPrices',handler)```: esta ruta devuelve la lista de los precios mínimo, medio y máximo de cada ciudad. Devuelve la lista junto con el código 200 y tipo ```application/json``` si hay ciudades en la base de datos, en caso contrario devuelve como antes, un json con 404 y un mensaje de recurso no encontrado.

### HU2:

Para la [HU2](https://github.com/WolfYe98/Proyecto_IV_Bate/issues/25) he definido una ruta junto con un hook:

  - ```app.get('/recommendation',handler)```: esta ruta, recibe un queryString, el hook de esta ruta, antes de nada revisa que en la petición haya un query, si la query no existe, directamente crea un log y devuelve una respuesta con el error 400 indicando que la petición no es correcta, y un mensaje. Al queryString hay que pasarle una serie de partes del cuerpo y la intensidad con la que el usuario suele usarlo, esta ruta recoge estas partes del cuerpo junto con su intensidad, analiza los estilos que hay en la base de datos y devuelve los estilos que más se le ajuste a las partes del cuerpo e intensidades que el usuario ha pasado.

### HU3:

  Para la [HU3](https://github.com/WolfYe98/Proyecto_IV_Bate/issues/28), he definido 4 rutas en total:
    - ``` app.get(/allstyles,handler) ```: Esta ruta, devuelve todos los estilos de danza con su información, con código 200 en caso de que haya estilos en la base de datos, y devuelve un 404 con un mensaje de recurso no encontrado en caso de que no haya ningún estilo.

    - En las 3 siguientes, que son:
      ```bash
        app.get('/style/:styleName',handler);
        app.get('/city/:cityName',handler);
        app.get('/founder/:founderName',handler);
        ```
    Para estas tres rutas, he definido un hook que se ejecuta justo antes de ejecutar el handler de cada ruta, dicho hook comprobará que la petición contenga un parámetro correcto, en caso de que el parámetro no es correcto, devuelve directamente un código 400 indicando que la petición no es correcta al cliente, y crea un log con un mensaje específico.
    Estas rutas devuelven un estilo cuyo nombre del estilo, la ciudad donde se fundó o el nombre del fundador, coincidan con lo que haya en el parámetro, si lo encuentran, devuelve el estilo y su información en tipo ```application/json``` junto con un código 200, y en caso contrario devuelve el json con un mensaje de recurso no encontrado y el código 404.

### HU4:

Para la [HU4](https://github.com/WolfYe98/Proyecto_IV_Bate/issues/29), he diseñado 3 rutas con un hook:

  - ```app.put('/addstyle',handler)```: esta ruta recibe la información de un estilo nuevo, si dicho estilo no existe en la base de datos, lo añade y devuelve un mensaje con el código 201 (recurso nuevo creado), y en caso contrario devuelve un error 400 (bad request) con un mensaje.

  - ```app.post('/updateStyle',handler)```: esta ruta recibe el nombre de un estilo que ya está en la base de datos, junto con la información que se quiere modificar/actualizar, si el nombre del estilo existe, modifica la información que le ha pasado y devuelve un mensaje de éxito con el código 200 y en caso contrario (nombre del estilo no está en la base de datos), devuelve un error 404 con un mensaje de recurso no encontrado.

  - ```app.delete('/deleteStyle/:deleteStyleName',handler)```: esta ruta sirve para eliminar un estilo, se le pasa el nombre de un estilo y si existe dicho nombre, lo elimina y devuelve un json con un mensaje de éxito con el código 200 y en caso contrario, devuelve un 404 con un mensaje de recurso no encontrado.

  - El hook de estas rutas, antes de nada, comprueba si el usuario ha pasado una clave, ya que sólamente los usuarios con clave pueden añadir/modificar/eliminar estilos, si el usuario no ha pasado ninguna clave, no se ejecuta los handlers y se devuelve al usuario un error 403 de autenticación con su correspondiente mensaje de error y también se crea un log para informar en el lado del servidor.
  Si el usuario ha pasado una clave, lo compruebo con la clave que se haya establecido con la configuración, si son iguales, comprueba para post y para delete si el nombre del estilo que la petición ha pasado está bién, si no lo está, devuelve un 400 con un mensaje de petición errónea, y crea un log en el servidor, en caso contrario, procede a la ejecución del handler de la ruta.

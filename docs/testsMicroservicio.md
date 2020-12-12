# Tests

## Test de las rutas:

En Fastify para testear la instancia del objeto tipo Fastify, está el método fatify.inject({}).
Para usarlo, primero he creado una función build aquí en este [fichero](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/main.js) que crea la instancia de fastify, y devuelve el objeto.
En el fichero de test, he llamado a la función build para obtener el objeto, luego para cada ruta he usado el método que Fastify proporciona, fastify.inject({}).
Este método crea una falsa petición http a las rutas, le pasamos como parámetro un objeto que tenga el tipo de la petición, la ruta, y los datos.
Por ejemplo:

```bash
const res = await fastify.inject({
  method:'GET',
  route:'/allstyles'
});
```
Aquí le estoy haciendo una petición tipo GET a la ruta ```/allstyles```.

Esta petición devuelve un objeto con la respuesta del servidor, esa respuesta lo guardo en la variable res para más tarde, testear por ejemplo el código de estado que ha devuelto la petición con chai.
```bash
expect(res).to.have.status(200);
```


## Test de la configuración:

Para la configuración, he creado una función que lee desde etcd3 los valores, si los valores no están en etcd, lo intento leer desde un archivo ```.env```, y si tampoco está en ```.env``` pone un valor por defecto. Y al final devuelvo un objeto tipo par clave-valor de los valores leidos.
El test espero que devuelva un objeto, y el puerto devuelto debe ser mayor que 0.

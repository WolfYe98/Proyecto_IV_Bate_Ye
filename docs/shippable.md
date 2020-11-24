## Shippable:
He elegido [Shippable](https://app.shippable.com) como mi segundo servicio de integración continua por varios motivos:
* Es muy parecido a Travis, sencillo de usar, simplemente tienes que darte de alta en la página web y activar el repositorio allí en la página ([Sigue estos pasos](http://docs.shippable.com/ci/enable-project/)).
* Tiene una interfaz que muestra muy bien todos los pasos de la construcción del repositorio.
* Es muy rápido, al menos hasta ahora no ha tardado más de 3 minutos en cada commit.
* El archivo de configuración es muy muy parecido al archivo de configuración de Travis, de esta forma, he podido configurarlo mucho más rápido.
* La [documentación](http://docs.shippable.com/ci/yml-structure/) que tiene sobre el archivo de configuración es muy completa.

#### Mi shippable.yml:
El archivo de configuración de Shippable que tengo es este: [shippable.yml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/shippable.yml).
Este archivo es muy parecido al archivo de configuración de Travis.

Para empezar, especifico el lenguaje que voy a utilizar:
```bash
$ language: node_js
```
Después, especifico las versiones donde voy a ejecutar los tests:
```bash
$ node_js:
  - "10"
  - "14"
```
En la construcción, indico que quiero tener un caché de node_modules, así no tienen que descargar las dependencias desde 0 por cada vez que haga un push (después del primer push ya tendríamos el caché de node_modules guardado):
```bash
$ cache: true
$ cache_dir_list:
  - $SHIPPABLE_BUILD_DIR/node_modules
```

Más tarde, instalo el gestor de tareas, y el módulo que deja que el gestor de tareas realice instalaciones:
```bash
$ npm install -g gulp
$ npm install gulp-install
```

y ahora instalo las dependencias con el gestor de tareas y ejecuto los tests:
```bash
$ gulp install
$ gulp test
```

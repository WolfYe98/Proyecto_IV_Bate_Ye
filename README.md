# DancInform
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
## Descripción:
DancInform es un API creado para consultar los distintos estilos de danzas modernas que hay, un poco de su historia y que parte del cuerpo se suelen trabajar más en cada estilo.
Con esta API, mi intención es facilitar a las personas que aún no han empezado a bailar, a entender un poco cómo es cada estilo y cómo trabajan el cuerpo en cada estilo, así pueden escoger desde un principio el estilo que crean que encajará mejor con ellos.
## Pasos para el desarrollo del proyecto:
[Aquí puedes encontrar los pasos que he ido siguiendo](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/docs/pasosaseguir.md)
## Herramientas y justificación
- [Para ver la justificación de las herramientas, pincha aquí](/docs/justificacion.md)
## Documentación:
- [¿Por qué JavaScript?](docs/herramientas.md)
- [Comprobación de Git](docs/comprobacion.md)
- [Clase Principal](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/database.js)
- [Enlace a Historias de Usuario](https://github.com/WolfYe98/Proyecto_IV_Bate/milestone/2)
- [iv.yaml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/iv.yaml)
- [Enlaces a issues abiertos](https://github.com/WolfYe98/Proyecto_IV_Bate/issues)
- [Enlaces a issues cerrados](https://github.com/WolfYe98/Proyecto_IV_Bate/issues?q=is%3Aissue+is%3Aclosed)
- [Enlaces a milestones](https://github.com/WolfYe98/Proyecto_IV_Bate/milestones)
## Dependencias:
[Para saber cómo instalar las dependencias, pincha aquí](docs/dependencias.md)
## Test:
[Fichero de explicación de ejecución de tests](docs/test.md)
## Docker:
En [este fichero](docs/dockerimagebase.md) explico la imagen base que he cogido y el por qué. También incluye los tests de diferentes imágenes probados.

### Dockerfile y descargar mi imagen Docker
[Aquí dejo el enlace de explicación a mi Dockerfile, y también explico cómo descargar mi imagen de Docker](docs/dockerfile.md)


### Automatización Docker
En [este fichero](docs/integraciondocker.md) explico lo que he hecho para realizar integración continua de Docker.

## Integración continua:
### Travis:
[Travis](https://travis-ci.com) es un servicio que el profesor ha recomendado, es un servicio de integración continua famosa, con buena documentación y la estructura de su archivo de configuración es sencilla de entender.
Es el primer servicio de integración continua que he configurado. Para utilizarlo simplemente tienes que darte de alta en
[Travis](https://travis-ci.com) y activar el repositorio (directamente en Travis)([Sigue estos pasos](https://travis-ci.com/getting_started)).
Después de activar el repositorio, tienes que configurar un fichero .travis.yml que indica las acciones que se realizarán en Travis.

#### Mi fichero .travis.yml:
[Este fichero .travis.yml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/.travis.yml) es el fichero de configuración para la integración continua.

Al principio especifico que utilice la imagen minimal, con esta línea:
```bash
$ language: minimal
```
Esta imagen está optimizado para ser más rápido y para usar menos espacio de disco, ya que solamente contiene Docker, python, algunas herramientas de red, herramientas de control de versiones y herramientas esenciales. No contiene nada más.

Ahora indico que se va a probar en dos distribuciones de linux, en [Focal](https://docs.travis-ci.com/user/reference/focal/) y en [Xenial](https://docs.travis-ci.com/user/reference/xenial/), he intentado usar osx y windows pero parece ser que Travis no los apoya ([OSX](https://github.com/travis-ci/travis-ci/issues/5738), [Windows](https://travis-ci.community/t/docker-linux-containers-on-windows/301/8)):
```bash
$ jobs:
  include:
    - os: linux
      dist: focal
    - os: linux
      dist: xenial
```
Ahora defino una variable de entorno que guarda la ruta del directorio de trabajo:
```bash
$ env:
  - HOME_DIR: ${HOME}/build/WolfYe98/Proyecto_IV_Bate
```
He visto que ```$TRAVIS_BUILD_DIR``` es la ruta absoluta del directorio donde el repositorio se está construyendo, es la misma que ```$HOME_DIR``` en este caso, entonces se podría usar también.

Al final ejecuto el test con el contenedor Docker:
```bash
$ script:
    - docker run -t -v $HOME_DIR:/test wolfye98/proyecto_iv_bate
```


### Shippable:
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

## Autor:
- [Bate Ye](https://github.com/WolfYe98)

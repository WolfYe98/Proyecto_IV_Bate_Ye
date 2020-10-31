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

## Dockerfile y descargar mi imagen Docker
[Aquí dejo el enlace de explicación a mi Dockerfile, y también explico cómo descargar mi imagen de Docker](docs/dockerfile.md)


## Integración continua Docker
En [este fichero](docs/integraciondocker.md) explico lo que he hecho para realizar integración continua de Docker.

## Integración continua:
### Travis:
[Travis](https://travis-ci.org), es el primer sistema de integración continua que he configurado. Para utilizarlo simplemente tienes que darte de alta en
[Travis](https://travis-ci.org) y activar el repositorio (directamente en Travis).
Después de activar el repositorio, tienes que configurar un fichero .travis.yml que indica las acciones que realizarán en Travis.
### Mi fichero .travis.yml:
[Este fichero .travis.yml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/.travis.yml) es el fichero de configuración para la integración continua.
Al principio del fichero, indico con:
```bash
$ language: node_js
```
que voy a utilizar node.js.

A continuación indico que voy a probar mi proyecto en 2 versiones de node con esta línea:
```bash
$ node_js:
  - "10"
  - "14"
```

Como vamos a utilizar el contenedor de Docker también, indico que quiero usar el servicio Docker así:
```bash
$ services:
  - docker
```

Preinstalo todas las dependencias, el task runner y el contenedor docker con:
el servicio Docker así:
```bash
$ before_install:
    - docker pull wolfye98/proyecto_iv_bate
    - npm install
    - npm install -g gulp
```

Al final ejecuto tanto el test con gulp como el test con el contenedor Docker:
```bash
$ script:
    - gulp test
    - docker run -t -v `pwd`:/test wolfye98/proyecto_iv_bate
```

## Autor:
- [Bate Ye](https://github.com/WolfYe98)

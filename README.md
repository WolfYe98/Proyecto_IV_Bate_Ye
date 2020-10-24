# DancInform
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
## Descripción:
DancInform es un API creado para consultar los distintos estilos de danzas modernas que hay, un poco de su historia y que parte del cuerpo se suelen trabajar más en cada estilo.
Con esta API, mi intención es facilitar a las personas que aún no han empezado a bailar, a entender un poco cómo es cada estilo y cómo trabajan el cuerpo en cada estilo, así pueden escoger desde un principio el estilo que crean que encajará mejor con ellos.
## Pasos para el desarrollo del proyecto:
[Aquí puedes encontrar los pasos que he ido siguiendo](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/docs/pasosaseguir.md)
## Herramientas y justificación
- **JavaScript: [Node.js](https://nodejs.org/es/)**
- **Chai**: [Chai](https://www.chaijs.com), Chai es una librería de aserciones bastante fácil de entender, tiene muy buena documentación, y los tutoriales que suelo encontrar sobre testing en JavaScript siempre utilizan Chai junto con Mocha, por esas razones he decidido escoger Chai junto con Mocha. Otra de las razones por la que he escogido Chai y Mocha es porque aparece en el temario y me llamó más la atención.
- **Mocha**: [Mocha](https://mochajs.org), Mocha es el framework que he escogido para realizar los tests, lo he escogido básicamente por la simplicidad y porque es de los frameworks de test más 'famosos' para JavaScript, por lo cual, es fácil de encontrar documentaciones y tutoriales de Mocha.
- **Gulp**: [Gulp](https://gulpjs.com). He elegido Gulp como como herramienta de construcción, es muy fácil de entenderlo y de utilizar. Con [Gulp](https://gulpjs.com) puedo definir tareas que se entienden casi a simple vista, además de que cuenta también con una buena documentación para consultar cualquier duda.

## Documentación:
- [¿Por qué JavaScript?](docs/herramientas.md)
- [Comprobación de Git](docs/comprobacion.md)
- [Clase Principal](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/database.js)
- [Enlace a Historias de Usuario](https://github.com/WolfYe98/Proyecto_IV_Bate/milestone/2)
- [iv.yaml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/iv.yaml)

## Dependencias:
Para instalar las dependencias hay que clonar el repositorio con:
```bash
$ git clone https://github.com/WolfYe98/Proyecto_IV_Bate
```
y ejecutar:
```bash
$ npm install
```
## Test:
Para ejecutar los tests, tienes que tener clonado este repositorio, instalar las dependencias como se indica arriba, y ejecutar:
```bash
$ gulp test
```
Los ficheros de test están [aquí](https://github.com/WolfYe98/Proyecto_IV_Bate/tree/master/test).
## Docker:
### Imagen base:
Para la imagen base, he decidido probar con alguna de las imágenes oficiales de NodeJS, y hay 3 de ellas que me han llamado más a simple vista:
- Node:14.14.0: Esta es la imagen más completa, ocupa 943MB ya que instala todo los paquetes del NodeJS aun que no lo vayas a utilizar.
- Node:14.14.0-alpine: Esta imagen es una versión reducida de la anterior, está basado en el proyecto Alpine Linux, ocupa solamente 117MB, tiene solo algunos paquetes básicos de NodeJS y puedes ir tu añadiendo cualquier cosa que necesites utilizando tu DockerFile.
- Node:14.14.0-slim: al igual que el anterior (alpine), esta es una versión más reducida de la primera, pesa 167MB y solamente contiene los paquetes necesarios para ejecutar Node, no tiene absolutamente nada más.

Así a simple vista, por tamaño me inclino un poco más por la versión alpine, ya que es también muy recomendado para imágenes finales pequeñas.

Pero ahora vienen las pruebas:

Todas las pruebas las he ejecutado en el Sistema Operativo Ubuntu 20.04
- Tiempo de construcción de Node:14.14.0: 107,01s
- Tiempo de construcción de Node:14.14.0-alpine: 54,74s
- Tiempo de construcción de Node:14.14.0-slim: 59,79s pero no ha podido ejecutar npm install (producía un error).

Dado que, el Node:14.14.0 tarda mucho y pesa mucho también y Node:14.14.0-slim no ejecuta npm install, he decidido utilizar Node:14.14.0-alpine.
## Autor:
- [Bate Ye](https://github.com/WolfYe98)

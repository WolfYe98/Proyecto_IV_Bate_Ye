# Docker:
## Imagen base:
Para la imagen base, he decidido probar con alguna de las imágenes oficiales de NodeJS, y hay 3 de ellas que me han llamado más a simple vista:
- Node:14.14.0: Esta es la imagen más completa, ocupa 943MB ya que instala todo los paquetes del NodeJS aun que no lo vayas a utilizar.
- Node:14.14.0-alpine: Esta imagen es una versión reducida de la anterior, está basado en el proyecto Alpine Linux, ocupa solamente 117MB, tiene solo algunos paquetes básicos de NodeJS y puedes ir tu añadiendo cualquier cosa que necesites utilizando tu Dockerfile.
- Node:14.14.0-slim: al igual que el anterior (alpine), esta es una versión más reducida de la primera, pesa 167MB y solamente contiene los paquetes necesarios para ejecutar Node, no tiene absolutamente nada más.

Así a simple vista, por tamaño me inclino un poco más por la versión alpine, ya que es también muy recomendado para imágenes finales pequeñas.

Pero ahora vienen las pruebas:

Todas las pruebas las he ejecutado en el Sistema Operativo Ubuntu 20.04
- Tiempo de construcción de Node:14.14.0: 107,01s
- Tiempo de construcción de Node:14.14.0-alpine: 54,74s
- Tiempo de construcción de Node:14.14.0-slim: 59,79s pero no ha podido ejecutar npm install (producía un error).

## Tamaño resultante y pruebas de tiempo de test:
## Tamaño resultante:
- Node:14.14.0: 1.01G
- Node:14.14.0-alpine: 184MB

## Tiempo de ejecución para test:
- Node:14.14.0: 2,65s
- Node:14.14.0-alpine: 1,71s

Dado que, el Node:14.14.0 tarda mucho y pesa mucho también y Node:14.14.0-slim no ejecuta npm install, he decidido utilizar Node:14.14.0-alpine.

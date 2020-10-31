# Dockerfile
[Pincha aquí para ver mi Dockerfile](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Dockerfile)

En mi Dockerfile, para empezar indico que voy a utilizar Node:14.14.0-alpine, después, copio los ficheros package.json y package-lock.json para luego ejecutar npm install para instalar las dependencias.

Una vez instalado las dependencias elimino los ficheros package.json y package-lock.json, más tarde ejecuto npm install -g gulp para instalar la herramienta de construcción.

Cambio el usuario al usuario "node", que existen en las imágenes oficiales de node por defecto y son no-superusuario. (He utilizado este usuario porque en estas imágenes no puedo ejecutar useradd ni groupadd).

Al final ejecuto gulp test para testear.

## Descargar la imagen:
Para ejecutar el test, tienes que clonar mi repositorio con:
```bash
$ git clone https://github.com/WolfYe98/Proyecto_IV_Bate
```
Para descargar mi imagen subida, puedes ejecutar este comando:
```bash
$ docker pull ghcr.io/wolfye98/proyecto_iv_bate:latest
```
Ir hasta el directorio de mi repositorio y ejecutar:
```bash
$ docker run -t -v `pwd`:/test wolfye98/proyecto_iv_bate
```
o
```bash
$ docker run -t -v `pwd`:/test ghcr.io/wolfye98/proyecto_iv_bate
```

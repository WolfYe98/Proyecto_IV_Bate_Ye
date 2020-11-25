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
En [este fichero](docs/travis.md) explico la integración continua con Travis.

### Shippable:
En [este fichero](docs/shippable.md) explico la integración continua con Shippable.


## Serverless:
### Vercel:
[Vercel](https://vercel.com/) es una plataforma donde puedes subir funciones serverless, de forma muy sencilla, además cuenta con integración con Github. Te puedes registrar con tu cuenta de Github.

Para desplegar tu función, sólamente tienes que crear un directorio (o incluso un repositorio a parte), en el repositorio tienes que tener una carpeta llamado ```api```, y dentro tiene que estar la función que quieres despegar. (Los ficheros de dependencias como package.json se encuentran en el directorio raíz que le asignes).

Para crear la función y probarla localmente antes de despegar, tienes que [instalar Vercel](https://vercel.com/download) con:
```bash
  $ npm i -g vercel
```

Una vez descargado, con ```vercel dev``` o con ```vc dev``` puedes probar tu función serverless localmente.

[Aquí dejo mi función que he desplegado en Vercel](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Vercel/Academies-pricing/api/academiesPricing.js) y la explicación está en [este fichero](docs/vercel.md).

[Este es el URL de la función](http://academies-pricing.vercel.app/api/academiesPricing).

Siguiendo [estos pasos](https://vercel.com/docs/git), puedes desplegar tu función y además configurarlo para que se auto-despliegue por cada push hecho en tu rama principal de tu repositorio de trabajo.


### Bot de Telegram desplegado en Vercel:
He creado un bot de Telegram que usa la función serverless que he desplegado en Vercel.

El los ficheros del bot se encuentran [aquí](https://github.com/WolfYe98/Proyecto_IV_Bate/tree/master/Vercel/pricing-bot).
Para los primeros pasos, que son la creación con ```@BotFather``` y configurar el webhook, he seguido [estos pasos](https://planetachatbot.com/telegram-bot-webhook-heroku-fa53c5d72081).

El bot lo he hecho también en JavaScript, el fichero del bot está [aquí](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Vercel/pricing-bot/api/pricingbot.js).

Como hemos configurado un webhook, no tenemos que usar ninguna librería que proporcionan de Node.js para crear bots, simplemente con las variables req y res de HTTP podemos crear las respuestas a los mensajes que le mandemos al bot.

El bot recibe por ```req.body.message``` los mensajes y los datos de los mensajes (chat_id, texto, etc...), con la información del mensaje recibido ```req.body.message.text``` crea en la función desplegada una respuesta adecuada, y crea el objeto ```j```, que contiene el mensaje de respuesta, indica al webhook de Telegram el método a utilizar y el id del chat que ha enviado la petición.

El objeto ```j``` lo devolvemos con ```res.status(200).json(j)```, ```status()``` son los [código de estado http](https://developer.mozilla.org/es/docs/Web/HTTP/Status).

El bot lo puedes encontrar en Telegram buscando ```@academiespricingbot```.
Con ```/start``` te devuelve el mensaje de bienvenida.
Para consultar los comandos, escribe ```/help```.


### Netlify:
Aquí los pasos iniciales de registro y de vincular repositorios de Github son casi iguales que Vercel, lo puedes ver [aquí](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).

La diferencia que tiene con Vercel, es que Vercel te permite indicarle cuál es el directorio de raíz usando la web, y en Netlify tienes que tener el fichero de configuraciones ```netlify.toml```.

Como mi función de Netlify están en el directorio ```Netlify/Recommendation```, en mi directorio principal está [este fichero](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/netlify.toml), este fichero indica a Netlify que antes de construir y que cambie al directorio indicado ([este enlace](https://docs.netlify.com/configure-builds/get-started/#definitions) lo indica):
```bash
  $[build]
  $  base = './Netlify/Recommendation'
```

En el directorio ```./Netlify/Recommendation``` hay otro fichero ```netlify.toml```, este segundo fichero indica donde se encuentra la función que quiero desplegar.
Este es el [segundo fichero netlify.toml](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Netlify/Recommendation/netlify.toml).

El fichero de la función que he desplegado en Netlify es [este](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Netlify/Recommendation/functions/recomendacion.js).
[Aquí esta la explicación del código](docs/netlify.md).

## Autor:
- [Bate Ye](https://github.com/WolfYe98)

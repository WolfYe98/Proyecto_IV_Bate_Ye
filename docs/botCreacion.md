# Creación del bot y configuración del webhook:

## Creación del bot
Para crear un bot de Telegram, lo primero que tengo que hacer es iniciar una conversación con ```@BotFather``` en telegram. He buscado ```@BotFather``` en Telegram, inicio la conversación y le envié este primer mensaje al ```@BotFather```:
```bash
  $ /start
```
El ```@BotFather``` me contesta con un mensaje que indica los pasos que tengo que seguir:
  - Envío ```/newbot``` para crear un bot nuevo.
  - Después me solicita un nombre para el bot, he escogido: ```pricingbot```
  - Ahora me pide un username para el bot y que tiene que terminar en ```bot```, entonces he escogido: ```academiespricingbot```.
  - Ya está el bot creado, ahora tendríamos que configurar el webhook para que utilice una función que he desplegado en Vercel para crear comandos y mensajes de respuesta del bot.

## Configurar el webhook:
Normalmente, si no uso un webhook, los bots que creo hacen peticiones al servidor de Telegram repetidamente para ver si hay algún mensaje nuevo.
Un webhook lo que hace es que el servidor cuando reciba un mensaje para el bot, le manda los mensajes, y ya lo enlazado al webhook se encarga de ver el mensaje y de realizar acciones con el mensaje.
Esto quiere decir que antes de configurar el webhook tendría que tener una función desplegado y que el webhook pueda engancharse, la función la he creado ya, lo explicaré en [este fichero](botFuncion.md), aquí voy a indicar como configurar el webhook.
Cuando he terminado lo pasos anteriores, el ```@BotFather``` en el mensaje de éxito de creación del bot, me devolvió un token, que es el identificador del bot.
Para configurar el webhook, simplemente en un navegador, he escrito:
```bash
  $ https://api.telegram.org/bot<BOT_TOKEN>/setWebHook?url=<URL_de_la_funcion>
```
Donde <BOT_TOKEN> lo sustituí por el token que me ha pasado ```@BotFather```y <URL_de_la_funcion> por ```https://pricing-bot.vercel.app/api/precingbot```.

Así ya he configurado el webhook para mi bot.

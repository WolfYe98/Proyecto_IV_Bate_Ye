# Función Serverless creado para gestionar los mensajes del bot

La función que he creado para gestionar los mensajes que recibe y envía el bot se encuentra [aquí](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/Vercel/pricing-bot/api/pricingbot.js).

## La función:
Esta función está desplegado en Vercel, su URL es:
```
  https://http://pricing-bot.vercel.app/api/precingbot
```
Cuando el bot recibe un mensaje, el webhook que le he configurado lo manda a esta función en la propiedad ```body``` de ```req```.
La propiedad ```req.body``` contiene la información del mensaje, como por ejemplo el texto que ha recibido, el id del chat donde lo ha recibido etc...
Por eso cuando hay una petición, miro si existe la propiedad ```req.body``` con esta línea:
```bash
  $ if(req.body != undefined){}
```
Después, compruebo que existe el mensaje con:
```bash
  $ if(req.body.message.text != undefined){}
```
Si existen los dos, compruebo que el mensaje recibido de ```req.body.message.text``` sea un comando que he definido con:
```bash
  $ switch(req.body.message.text){}
```
Si el mensaje es uno de los comandos, este cambia la variable del mensaje de respuesta a con un correspondiente.
Este bot usa el micro-api que he creado antes para consultar los precios de las academias de cada ciudad, entonces si el comando es sobre una ciudad, este realiza una consulta al micro-api, recibe una respuesta del micro-api y modifica el mensaje de respuesta.
Después del switch case, creo un objeto que contiene el mensaje de respuesta, el método que indico al webhook que utilice, y el id del chat donde recibimos anteriormente el request:
```bash
  $ var j = {text: mensaje, method: "sendMessage",  chat_id: chatID}
```
Y lo devolvemos con ```res```(response):
```bash
  $ res.setHeader("Content-Type","application/json")
  $ res.status(200).json(j)
```

Si no existe el body, es decir que no ha sido el bot quien ha realizado la petición, esta función devuelve un mensaje indicando que es una función desplegada para un bot.
```bash
  $ res.setHeader("Content-Type","text/plain");
  $ res.status(200).send('This is a function deployed for TelegramBot named @academiespricingbot');
```

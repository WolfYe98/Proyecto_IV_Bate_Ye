# Integración de la función desplegado en el proyecto:

En [este fichero](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/app/recommendation.js) puedes ver la función que he implementado que utiliza la función desplegado en Netlify para obtener recomendaciones de estilos a aprender.

Esta función, recibe como parámetros un array de objetos tipo BodyPartLevel:
```bash
  $ async function recommendation(bodyParts){
```

Coge la URL de la función desplegada en Netlify, y le añade los parámetros (que son partes del cuerpo y un número entre 0-4):
```bash
  $ URL = URL+'?'+bodyParts[0].getBodyPart()+'='+bodyParts[0].getUseLevel().toString();
  $ for(i = 1; i < bodyParts.length; i++){
    URL += '&'+bodyParts[i].getBodyPart()+'='+bodyParts[i].getUseLevel().toString();
  }
```

Luego realiza una petición a la URL y espera obtener un resultado:
```bash
  $ var obj = await fetch(URL).then(res=>res.json()).then(datos=>{return datos}).catch(err=>console.log(err));
```

Al final, retorna un array con las claves del objeto recibido de la petición anterior, siendo esas claves, los nombres de cada estilo recomendado por la función desplegada en Netlify.

Aquí están los [tests](https://github.com/WolfYe98/Proyecto_IV_Bate/blob/master/test/database-chai.js).

Y aquí los issues e historias de usuario que he avanzado:
https://github.com/WolfYe98/Proyecto_IV_Bate/issues/25
https://github.com/WolfYe98/Proyecto_IV_Bate/issues/27

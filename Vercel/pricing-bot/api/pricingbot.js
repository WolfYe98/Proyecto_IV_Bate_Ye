//pricing-bot
var fetch = require('node-fetch');
module.exports = async (req,res)=>{
  if(req.body != undefined){
    if(req.body.message.text != undefined){
      //var URL_BOT = 'https://api.telegram.org/bot'+process.env.BOT_TOKEN; prueba
      var mensaje = "";
      var url_api_prices = 'https://academies-pricing.vercel.app/api/academiesPricing';
      var chatID = req.body.message.chat.id;
      var gen = await fetch(url_api_prices).then(res=>res.json()).then(datos=>{return datos});
      var cityURL = url_api_prices+'?city=';
      var cityPrice;
      switch(req.body.message.text){
        case '/start':
          mensaje = 'Hola este es un bot creado para darte los precios de las academias de cada ciudad'
          break;
        case '/help':
          mensaje = 'Los comandos existentes son /start, /help, /general, /madrid, /barcelona, /newyork, /losangeles, /sevilla';
          break;
        case '/general':
          var keys = Object.keys(gen);
          for(var i = 0; i < keys.length; i++){
            mensaje += keys[i] + ':\n';
            mensaje += "   Mínimo: "+gen[keys[i]].Minimum+'€'+"\n";
            mensaje += "   Medio: "+gen[keys[i]].Medium+'€'+'\n';
            mensaje += "   Máximo: "+gen[keys[i]].Maximum+'€'+'\n';
          }
          break;
        case '/madrid':
          var u = cityURL+'madrid'
          cityPrice = await fetch(u).then(res=>res.json()).then(datos=>{return datos});
          mensaje = 'Precio de academias de Madrid:\n';
          var keys = Object.keys(cityPrice['Madrid']);
          for(var i = 0; i < keys.length; i++){
            mensaje+="   "+keys[i]+": "+cityPrice['Madrid'][keys[i]]+'€'+"\n";
          }
          break;
        case '/barcelona':
          var u = cityURL+'barcelona'
          cityPrice = await fetch(u).then(res=>res.json()).then(datos=>{return datos});
          mensaje = 'Precio de academias de Barcelona:\n';
          var keys = Object.keys(cityPrice['Barcelona']);
          for(var i = 0; i < keys.length; i++){
            mensaje+="   "+keys[i]+": "+cityPrice['Barcelona'][keys[i]]+'€'+"\n";
          }
          break;
        case '/sevilla':
          var u = cityURL+'sevilla'
          cityPrice = await fetch(u).then(res=>res.json()).then(datos=>{return datos});
          mensaje = 'Precio de academias de Sevilla:\n';
          var keys = Object.keys(cityPrice['Sevilla']);
          for(var i = 0; i < keys.length; i++){
            mensaje+="   "+keys[i]+": "+cityPrice['Sevilla'][keys[i]]+'€'+"\n";
          }
          break;
        case '/newyork':
          var u = cityURL+'new york'
          cityPrice = await fetch(u).then(res=>res.json()).then(datos=>{return datos});
          mensaje = 'Precio de academias de New York:\n';
          var keys = Object.keys(cityPrice['NewYork']);
          for(var i = 0; i < keys.length; i++){
            mensaje+="   "+keys[i]+": "+cityPrice['NewYork'][keys[i]]+'€'+"\n";
          }
          break;
        case '/losangeles':
          var u = cityURL+'los angeles'
          cityPrice = await fetch(u).then(res=>res.json()).then(datos=>{return datos});
          mensaje = 'Precio de academias de Los Ángeles:\n';
          var keys = Object.keys(cityPrice['LosAngeles']);
          for(var i = 0; i < keys.length; i++){
            mensaje+="   "+keys[i]+": "+cityPrice['LosAngeles'][keys[i]]+'€'+"\n";
          }
          break;

      }
      var j = {text: mensaje, method: "sendMessage",  chat_id: chatID};
      res.setHeader("Content-Type","application/json");
      res.status(200).json(j);
//-------------------------------------------Prueba-------------------------------------------------------------------------
      //if(mensaje != ""){
      //  var sendm = URL_BOT+'/sendMessage?chat_id='+j.chat_id.toString() + '&text='+j.mensaje;
      //  var retorno = await fetch(sendm).then(res=>res.json).then(datos=>{return datos}).catch(err=>console.log(err));
      //  return retorno;
      //}
//-------------------------------------------Prueba-------------------------------------------------------------------------
    }
  }
  else{
    res.setHeader("Content-Type","text/plain");
    res.status(200).send('This is a function deployed for TelegramBot named @academiespricingbot');
  }
}

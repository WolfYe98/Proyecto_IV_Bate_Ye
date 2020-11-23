var data = require('./prices.js')
module.exports = (req, res) => {
  var obj = {};
  var keys = Object.keys(data);
  if(req.query.city == undefined){
    var indexKey = 0;
    Object.entries(data).forEach(([key, value]) => {
      var medium = 0;
      var maximum = 0;
      var minimum = 0;
      var lenght = 0;
      var j=0;

      Object.entries(value).forEach(([k,v]) =>{
        if(v > maximum){
          maximum = v;
        }
        if(j == 0){
          minimum = v;
          j++;
        }
        else if(minimum > v){
          minimum = v;
        }
        medium = medium + v;
        lenght++;
      });

      medium = medium/lenght;
      var objCity = {};
      objCity['Maximum']=maximum;
      objCity['Minimum'] = minimum;
      objCity['Medium'] = medium;
      obj[keys[indexKey]] = objCity;
      indexKey++;
    });
  }
  else{
    var nombre_ciudad=(req.query.city).toString();
    nombre_ciudad = nombre_ciudad.toLowerCase();
    var cadena = nombre_ciudad.split(' ');
    var i = 0;
    cadena.forEach((ele,index,a)=>{
      ele = ele.charAt(0).toUpperCase()+ele.substring(1,ele.length);
      if(i == 0){
        nombre_ciudad=ele;
        i++;
      }
      else{
        nombre_ciudad+=ele;
      }
    });
    if(keys.includes(nombre_ciudad)){
      var dato_ciudad = data[nombre_ciudad];
      obj[nombre_ciudad] = dato_ciudad;
    }
    else{
        obj={includedCities:keys};
    }
  }
  res.setHeader('Content-Type','application/json'); //Esta línea no tienes porque ponerlo ya que res.json ya
  // settea el header automáticamente a: 'Content-Type','application/json'
  res.status(200).json(obj);
};


class BodyPartLevel{
  /**
  * @function Constructor
  * @summary Constructor que recibe el bodyPart y el estilo del baile o un numero que será el uso de esa parte del cuerpo. (Si recibe el estilo devuelve la intensidad del estilo y sino es un objeto sin estilo).
  * @author Bate Ye
  * @param {string} style Es el nombre del estilo de baile que queremos saber sus usos del cuerpo.
  */
  constructor(bodyPart, style){
    this.levels = {
      "hiphop":{
          "cadera":3,
          "piernas":2,
          "pecho": 1,
          "brazos": 1
      }
    }
    this.bodyPart = bodyPart.toLowerCase();
    if(typeof style === 'string'){
      this.style = style;
      if(this.levels[style.toLowerCase()][this.bodyPart] != undefined){
        this.useLevel = this.levels[style.toLowerCase()][this.bodyPart];
      }
      else{
        this.useLevel = -1;
      }
    }
    else if(typeof style === 'number'){
      this.useLevel = style;
      this.style ="";
    }
  }
  /**
  * @function getBodyPart
  * @summary Método que devuelve un string que es el nombre de la parte del cuerpo
  * @author Bate Ye
  * @returns {string} Devuelve el nombre de la parte del cuerpo
  */
  getBodyPart(){
    return this.bodyPart;
  }
  /**
  * @function getUseLevel
  * @summary Método que devuelve el nivel de uso que se le da a esta parte del cuerpo en este estilo
  * @author Bate Ye
  * @returns {number} Devuelve el nombre de la parte del cuerpo
  */
  getUseLevel(){
    return this.useLevel;
  }
  /**
  * @function setBodyPart
  * @summary Método que cambia la parte del cuerpo del objeto
  * @param {string} body Es el nuevo nombre del bodyPart
  * @author Bate Ye
  */
  setBodyPart(body){
    if(typeof body === "string"){
      this.bodyPart = body;
      this.useLevel = this.levels[this.style][this.bodyPart];
    }
  }
  /**
  * @function setUseLevel
  * @summary Método que cambia el nivel de uso de la parte del cuerpo del objeto
  * @param {number} level Es el nuevo nivel de uso
  * @author Bate Ye
  */
  setUseLevel(level){
    if(typeof level === "number"){
      if(level >= 0 && level <= 3){
        this.levels[this.bodyPart] = level;
        this.useLevel = level;
      }
    }
  }
}

module.exports = BodyPartLevel;


class BodyPartLevel{
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
    this.style = style;
    if(this.levels[style.toLowerCase()][this.bodyPart] != undefined){
      this.useLevel = this.levels[style.toLowerCase()][this.bodyPart];
    }
    else{
      this.useLevel = -1;
    }
  }
  getBodyPart(){
    return this.bodyPart;
  }
  getUseLevel(){
    return this.useLevel;
  }
  setBodyPart(body){
    if(typeof body === "string"){
      this.bodyPart = body;
      this.useLevel = this.levels[this.style][this.bodyPart];
    }
  }
  setUseLevel(level){
    if(typeof level === "number"){
      this.levels[this.bodyPart] = level;
      this.useLevel = level;
    }
  }
}

module.exports = BodyPartLevel;

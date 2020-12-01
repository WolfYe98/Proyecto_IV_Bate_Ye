const Database = require('./database.js');

class Styles{
  constructor(db){
    if(db instanceof Database){
      this.db = db;
    }
    else{
      throw new Error('The parameter is not a database instance');
    }
  }
  getStyles(){
    return this.db.getStyles();
  }
  getStyleByName(name){
    return this.db.getStyleByName(name);
  }
  getStyleByFounder(founder){
    return this.db.getStyleByFounder(founder);
  }
  getStylesByCity(city){
    return this.db.getStylesByCity(city);
  }
  addStyle(styleName, year, founder, city, history, description, body){
    return this.db.addStyle(styleName, year, founder, city, history, description, body);
  }
  deleteStyle(styleName){
    this.db.deleteStyle(styleName);
  }

}

module.exports = Styles;

var fs=require('fs');

class Database{
  /**
  * @function constructor
  * @summary Constructor de la clase Database, recibe un parámetro path y extrae los datos de un fichero json
  * @author Bate Ye
  * @param {string} path Ruta al archivo que guardan los datos
  */
  constructor(path){
    this.path = path;
    try{
      this.dataFile = fs.readFileSync(this.path,'utf-8');
      this.data = JSON.parse(this.dataFile);
    }
    catch(err){
      this.data = undefined;
      console.log(err);
    }
    console.log(this.data);
  }

    /**
    * @function getStyles
    * @summary Método para consultar los estilos de baile.
    * @author Bate Ye
    * @returns {array} Devuelve un array con los nombres de los diferentes estilos de baile.
    */
  getStyles(){
    return Object.keys(this.data);
  }
    /**
    * @function close
    * @summary Método para cerrar la "conexión" a la base de datos
    * @author Bate Ye
    * 
    */
  close(){
    this.path = undefined;
    this.dataFile = undefined;
    this.data = undefined;
  }
}

module.exports = Database;

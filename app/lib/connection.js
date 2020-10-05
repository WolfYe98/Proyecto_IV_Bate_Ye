var mysql = require('mysql');

class Connection{
  constructor(host,user,password){
    this.host = host;
    this.user = user;
    this.password = password;
    this.conexion = null;
  }
  connect(){
    this.conexion = mysql.createConnection({host:this.host,user:this.user,password:this.password});
    var connected = false;
    conexion.connect(function(err){
      if (err){
        throw err;
      }
      connected = true;
    });
    return connected;
  }
  close(){
    this.conexion.end();
  }
}

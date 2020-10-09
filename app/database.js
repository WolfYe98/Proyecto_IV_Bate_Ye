var fs=require('fs');

class Database{
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
  getStyles(){
    return Object.keys(this.data);
  }
  close(){
    this.path = undefined;
    this.dataFile = undefined;
    this.data = undefined;
  }
}

module.exports = Database;

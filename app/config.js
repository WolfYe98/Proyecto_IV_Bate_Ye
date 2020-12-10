const {Etcd3} = require('etcd3');
const dotenv = require('dotenv');

async function exportConfig(){
  const client = new Etcd3();
  var ENVVARIABLES=['proyecto_iv_bate:PORT','proyecto_iv_bate:KEY']
  var ret = {};
  for(var i = 0; i < ENVVARIABLES.length; i++){
    try{
      var value = await client.get(ENVVARIABLES[i]).string();
      if(value == null){
        var res = dotenv.config();
        if(res.error){
          if(ENVVARIABLES[i] == 'proyecto_iv_bate:PORT'){
            value = 3000;
          }
          else if(ENVVARIABLES[i] == 'proyecto_iv_bate:KEY'){
            value = 19980930;
          }
        }
        else{
          value = process.env[ENVVARIABLES[i]];
        }
      }
    }catch(err){
      var res = dotenv.config();
      if(res.error){
        if(ENVVARIABLES[i] == 'proyecto_iv_bate:PORT'){
          value = 3000;
        }
        else if(ENVVARIABLES[i] == 'proyecto_iv_bate:KEY'){
          value = 19980930;
        }
      }
      else{
        value = process.env[ENVVARIABLES[i].replace('proyecto_iv_bate:','')];
      }
    }
    ret[ENVVARIABLES[i].replace('proyecto_iv_bate:','').toLowerCase()] = value;
  }
  return ret;
}


module.exports = exportConfig;

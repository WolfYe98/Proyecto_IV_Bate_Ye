const build = require('./main.js');
const exportConfig = require('./config.js');
(async()=>{
  var configs = await exportConfig();
  var app = build({
    logger:{
      prettyPrint:true
    }
  });
  app.listen(parseInt(configs.port),(err)=>{
    if(err){
      console.log(err);
      throw err;
      process.exit(1);
    }
    console.log(`Success!`);
  });
})();

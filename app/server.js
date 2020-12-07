var build = require('./main.js');

var app = build({
  logger:{
    level:'error',
    prettyPrint:true
  }
});
app.listen(3000,(err)=>{
  if(err){
    console.log(err);
    throw err;
    process.exit(1);
  }
  console.log('Success!');
});

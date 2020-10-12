var expect = require('chai').expect;
var Database = require('../app/database.js');
var path = require('path');


describe('Testing Database Class',function(){
  describe('Create a Database object with wrong path',function(){
    var db = new Database(__dirname+'/../app/data/data_no_existente.json');
    it('Should create an Database Object even the path doesn`t exist',function(){
      expect(db).to.be.a('object');
    });
    it('The data attribute should be undefined',function(){
      expect(db.data).to.be.undefined;
    });
  });
  describe('Create a Database object with right path',function(){
    var db = new Database(__dirname+'/../app/data/data_test.json');
    it('Should create a Database Object',function(){
      expect(db).to.be.a('object');
    });
    it('Should have some data in data attribute',function(){
      var esperado = {
        "hiphop": {
          "year": 1970,
          "founder": "DJ Kool Herc",
          "city": "New York",
          "history": "Hip-Hop en la actualidad lo conocen como un estilo de danza urbana freestyle, pero en realidad Hip-Hop es una cultura generada en el sur de Bronx, New York en los años 70s por los jovenes afroamericanos y LatinoAmericanos. En un principio Hip-Hop se refería a 4 grandes elementos: rap, breaking, graffiti y djing. Durante los 70s, 80s, el único estilo de baile del Hip-Hop era solamente breaking, hasta que empezaron a desarrollar más pasos de baile sin movimientos en el suelo (top-rocks), y entonces nació el estilo de baile llamado Hip-Hop",
          "description": "Hip-Hop es un baile que requiere muchos bounces (rebotes), es más, lo primero que se enseña en Hip-Hop son los 2 tipos de bounce que hay, el up y el down. En Hip-Hop es muy importante que nunca se olviden del bounce, ya que es lo fundamental de este estilo. Requiere muchas prácticas para dominar el bounce hasta meterlo en pasos más complejos como el slide, ball change, kick ball change etc... Otra parte muy importante es la musicalidad, es decir, saber contar los 8s de la música. Hoy en día, las personas suelen bailar Hip-Hop con música de diferentes estilos, pero en su inicio, Hip-Hop siempre se bailaba con rap old school.",
          "body":["piernas","pecho","cadera"]
        },
        "krump": {},
        "popping": {},
        "locking": {},
        "waacking":{},
        "breakdance":{},
        "urban":{}
      }
      expect(JSON.stringify(db.data)).to.equal(JSON.stringify(esperado));
    });
  });


  var db = new Database(__dirname+'/../app/data/data_test.json');

  describe('Test getStyles function',function(){
    it('Should return an array',function(){
      expect(db.getStyles()).to.be.a('array');
    });
  });

  describe('Test getStyleByName function',function(){
    it('Should return an JavaScript Object using the parameter hiphop',function(){
      expect(db.getStyleByName("hiphop")).to.be.a('Object');
    });
  });

  describe('Test getStyleByFounder function',function(){
    it('Should return an JavaScript Object using the parameter DJ',function(){
      expect(db.getStyleByFounder("DJ")["founder"].toLowerCase()).to.equal('dj kool herc');
    });
  });

  describe('Testing add a style',function(){
    it('Database should be updated', function(){
      db.addStyle("New Style",2020,"Ming","Granada","Prueba new style","Esto es una prueba de inserción",["Todo el cuerpo"]);
      var esperado = {
        "New Style":{
          "year": 2020,
          "founder": "Ming",
          "city": "Granada",
          "history": "Prueba new style",
          "description": "Esto es una prueba de inserción",
          "body":["Todo el cuerpo"]
        },
        "hiphop": {
          "year": 1970,
          "founder": "DJ Kool Herc",
          "city": "New York",
          "history": "Hip-Hop en la actualidad lo conocen como un estilo de danza urbana freestyle, pero en realidad Hip-Hop es una cultura generada en el sur de Bronx, New York en los años 70s por los jovenes afroamericanos y LatinoAmericanos. En un principio Hip-Hop se refería a 4 grandes elementos: rap, breaking, graffiti y djing. Durante los 70s, 80s, el único estilo de baile del Hip-Hop era solamente breaking, hasta que empezaron a desarrollar más pasos de baile sin movimientos en el suelo (top-rocks), y entonces nació el estilo de baile llamado Hip-Hop",
          "description": "Hip-Hop es un baile que requiere muchos bounces (rebotes), es más, lo primero que se enseña en Hip-Hop son los 2 tipos de bounce que hay, el up y el down. En Hip-Hop es muy importante que nunca se olviden del bounce, ya que es lo fundamental de este estilo. Requiere muchas prácticas para dominar el bounce hasta meterlo en pasos más complejos como el slide, ball change, kick ball change etc... Otra parte muy importante es la musicalidad, es decir, saber contar los 8s de la música. Hoy en día, las personas suelen bailar Hip-Hop con música de diferentes estilos, pero en su inicio, Hip-Hop siempre se bailaba con rap old school.",
          "body":["piernas","pecho","cadera"]
        },
        "krump": {},
        "popping": {},
        "locking": {},
        "waacking":{},
        "breakdance":{},
        "urban":{}
      };
      expect(JSON.stringify(db.data).toLowerCase()).to.equal(JSON.stringify(esperado).toLowerCase());
    });
  });

  describe('Testing deleteStyle function',function(){
    it('Should delete a style which name is New Style',function(){
      var retorno = db.deleteStyle("New Style");
      var esperado = {
        "hiphop": {
          "year": 1970,
          "founder": "DJ Kool Herc",
          "city": "New York",
          "history": "Hip-Hop en la actualidad lo conocen como un estilo de danza urbana freestyle, pero en realidad Hip-Hop es una cultura generada en el sur de Bronx, New York en los años 70s por los jovenes afroamericanos y LatinoAmericanos. En un principio Hip-Hop se refería a 4 grandes elementos: rap, breaking, graffiti y djing. Durante los 70s, 80s, el único estilo de baile del Hip-Hop era solamente breaking, hasta que empezaron a desarrollar más pasos de baile sin movimientos en el suelo (top-rocks), y entonces nació el estilo de baile llamado Hip-Hop",
          "description": "Hip-Hop es un baile que requiere muchos bounces (rebotes), es más, lo primero que se enseña en Hip-Hop son los 2 tipos de bounce que hay, el up y el down. En Hip-Hop es muy importante que nunca se olviden del bounce, ya que es lo fundamental de este estilo. Requiere muchas prácticas para dominar el bounce hasta meterlo en pasos más complejos como el slide, ball change, kick ball change etc... Otra parte muy importante es la musicalidad, es decir, saber contar los 8s de la música. Hoy en día, las personas suelen bailar Hip-Hop con música de diferentes estilos, pero en su inicio, Hip-Hop siempre se bailaba con rap old school.",
          "body":["piernas","pecho","cadera"]
        },
        "krump": {},
        "popping": {},
        "locking": {},
        "waacking":{},
        "breakdance":{},
        "urban":{}
      };
      expect(JSON.stringify(db.data).toLowerCase()).to.equal(JSON.stringify(esperado).toLowerCase());
    });
  });
});

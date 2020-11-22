var expect = require('chai').expect;
var Database = require('../app/database.js');
var path = require('path');
var BodyPartLevel = require('../app/bodypartlevel.js');
var recommendation = require('../app/recommendation.js');
var consultarPrecioCiudad = require('../app/prices.js').consultarPrecioCiudad;
var consultarPrecioGeneral = require('../app/prices.js').consultarPrecioGeneral;
//Testeando la clase BodyPartLevel
describe('Testing BodyPartLevel Class',function(){
  var bpart = new BodyPartLevel('pecho', 'hiphop');
  describe('Testing getBodyPart Function',function(){
    it('Should return `pecho` string',function(){
      expect(bpart.getBodyPart()).to.equal('pecho');
    });
  });
  describe('Testing getUseLevel Function',function(){
    it('Should return a number',function(){
      expect(bpart.getUseLevel()).to.be.a('number');
    });
  });
  describe('Testing getStyleBodyPartIntensity Function',function(){
    it('Should return an object',function(){
      var level_esperado = {
        "hiphop":{
            "cadera":3,
            "piernas":2,
            "pecho": 1,
            "brazos": 1
        },
        "krump":{
            "brazos":3,
            "piernas":3,
            "pecho": 1,
            "cadera": 1
        }
      }
      expect(JSON.stringify(bpart.getStyleBodyPartIntensity()).toLowerCase()).to.equal(JSON.stringify(level_esperado).toLowerCase());
    });
  });
  describe('Testing setBodyPart Function',function(){
    it('Should change the bodyPart to `cadera`',function(){
      bpart.setBodyPart('cadera');
      expect(bpart.getBodyPart()).to.equal('cadera');
    });
  });
  describe('Testing setUseLevel Function',function(){
    it('Should change the useLevel to 0',function(){
      bpart.setUseLevel(0);
      expect(bpart.getUseLevel()).to.equal(0);
    });
  });
  describe('Testing BodyPartLevel without style',function(){
    var new_bpart = new BodyPartLevel('cadera', 10)
    it('Should return 10 in getUseLevel',function(){
      expect(new_bpart.getUseLevel()).to.equal(10);
    });
  });
});

//Testeando la clase database
describe('Testing Database Class',function(){
  var db = new Database(undefined);

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
            "body":["piernas","pecho","cadera","brazos"]
          },
          "krump": {
            "year": 2000,
            "founder": "Tight Eyez",
            "city": "Los Angeles",
            "history": "",
            "description": "",
            "body":["brazos","piernas","cadera"]
          }
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
          "body":["piernas","pecho","cadera","brazos"]
        },
        "krump": {
          "year": 2000,
          "founder": "Tight Eyez",
          "city": "Los Angeles",
          "history": "",
          "description": "",
          "body":["brazos","piernas","cadera"]
        }
      };
      expect(JSON.stringify(db.data).toLowerCase()).to.equal(JSON.stringify(esperado).toLowerCase());
    });
  });

  describe('Testing getBodyPartArray function',function(){
    it('Should return an array',function(){
      expect(db.getBodyPartArray("hiphop")).to.be.a("array");
    });
    it('Should have only BodyPartLevel objects',function(){
      db.getBodyPartArray("hiphop").forEach(function(e,i,array){
        expect(e).to.be.an.instanceof(BodyPartLevel);
      });
    });
  });
});

//Testeando la función recommendation
describe('Testing recommendation(array) function',function(){
  it('Should return KRUMP string',function(){
    expect(recommendation.recommendation([new BodyPartLevel('cadera', 2),new BodyPartLevel('pecho', 0)])).to.equal('KRUMP');
  });
});

//Testeando funciones que utilizan el micro-api
describe('Testing consultarPrecioGeneral function', function(){
  it('Should return an object with prices minimum, maximum and medium of each city',async function(){
    var general = await consultarPrecioGeneral();
    var generalEsperado = {Madrid:{Maximum:55,Minimum:30,Medium:42.5},Barcelona:{Maximum:60,Minimum:40,Medium:48.5},NewYork:{Maximum:160,Minimum:76,Medium:109.25},Sevilla:{Maximum:42,Minimum:35,Medium:38.25},LosAngeles:{Maximum:57,Minimum:17,Medium:38}};
    expect(JSON.stringify(general)).to.equal(JSON.stringify(generalEsperado));
  });
});

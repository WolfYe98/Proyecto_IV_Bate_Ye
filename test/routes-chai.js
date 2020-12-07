const expect = require('chai').expect;
const build = require('../app/main.js');
const chaiHttp = require('chai-http');
const chai = require('chai');

var app = build({
  logger:{
    level:'error',
    prettyPrint:true
  }
});

chai.use(chaiHttp);

//On fastify, we use fastify.inject to make a fake request to our route.
describe('Testing routes',()=>{
  describe('Testing /allstyles route',()=>{
    it('Should return all style names',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/allstyles'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /style/:styleName route',()=>{
    it('Should have hiphop style',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/style/hiphop'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /city/:cityName route',()=>{
    it('Should have NewYork city styles',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/city/newyork'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /founder/:founderName route',()=>{
    it('Should have a founder which name is DJ KOOL HERC',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/founder/djkoolherc'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /prices/:city route',()=>{
    it('Should have a city called Madrid',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/prices/madrid'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /prices route',()=>{
    it('Should have a list of prices',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/prices'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /recommendation route',()=>{
    it('Should recommend a style',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/recommendation',
        query: {brazos:3,cadera:3}
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /addStyle route',()=>{
    it('Should add the new style and return a 201 status code',async ()=>{
      const res = await app.inject({
        method:'PUT',
        url: '/addstyle',
        body:{
          key:19980930,
          newStyle:{
            name:'New Style',
            year: 2020,
            founder: 'Bate Ye',
            city: 'Madrid',
            history: 'At this moment im creating a new style',
            description: 'This is just an style for testing my api',
            body: ["cabeza"]
          }
        }
      });
      expect(res).to.have.status(201);
    });
  });


});

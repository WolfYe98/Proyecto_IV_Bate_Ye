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

  


});

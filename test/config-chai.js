const expect = require('chai').expect;
const exteportConfig = require('../app/config.js');
const chaiHttp = require('chai-http');
const chai = require('chai');


describe('Testing external configuration function',()=>{
  it('Should return an Object',async()=>{
    var config = await exteportConfig();
    expect(config).to.be.an('object');
  });
  it('Should return an int PORT',async()=>{
    var config =await exteportConfig();
    expect(config.port).to.be.above(0);
  });
});

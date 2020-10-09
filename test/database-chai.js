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
    var db = new Database(__dirname+'/../app/data/data.json');
    it('Should create a Database Object',function(){
      expect(db).to.be.a('object');
    });
    it('Should have some data in data attribute',function(){
      expect(db.data).to.be.a('object');
    });
  });

  var db = new Database(__dirname+'/../app/data/data.json');
  describe('Test getStyles function',function(){
    it('Should return an array',function(){
      expect(db.getStyles()).to.be.a('array');
    });
    it('The array should have some dancing Style inside',function(){
      
    });
  });
});

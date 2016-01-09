/*eslint max-nested-callbacks: 0, no-unused-expressions: 0 */
'use strict';
// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// mock data
let mockReq = {
  'originalIp': '1313'
};

// modules to test
// /////////////////////////////////////////////////////////
let privates = require('../../lib/privates');


describe('Privates', function () {
  describe('#handleRequest', function () {
    it('should return .originalIp of passed request', function (){
      let ip = privates.handleRequest(mockReq.originalIp);
      ip.should.be(mockReq.originalIp);
    });
  });

  describe('#noop', function () {
    it('should be a function', function () {
      privates.noop.should.be.a.function;
    })

    it('should not return anything when called', function (){
      let val = privates.noop();
      val.should.be.undefined;
    });
  });
});

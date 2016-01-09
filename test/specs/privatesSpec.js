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
  'originalUrl': '1313'
};

// modules to test
// /////////////////////////////////////////////////////////
let privates = require('../../lib/privates');

describe('Privates', function () {
  describe('#handleRequest', function () {
    it('should return .originalUrl of passed request', function (){
      let ip = privates.handleRequest(mockReq);
      ip.should.eql(mockReq.originalUrl);
    });
  });

  describe('#noop', function () {
    it('should be a function', function () {
      privates.noop.should.be.a.function;
    })

    it('should return undefined when called', function (){
      var val = typeof privates.noop();
      val.should.equal('undefined');
    });
  });
});

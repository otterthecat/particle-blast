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
let config = {
  'device': '1234',
  'token': 'abcd'
};

// modules to test
// /////////////////////////////////////////////////////////
let Blast = require('../../index');
let privates = require('../../lib/privates');
let blast;
let middleware;
let action = 'rawr';
let callback = sinon.spy();
let req = {
  'originalUrl': 'aol.com',
  'ip': '789'
};
let res = {};
let next = sinon.spy();
let parse = sinon.stub();
parse.withArgs(req).returns(req.ip);

describe('Particle-Blast', function () {
  beforeEach(function () {
    blast = new Blast(config);
    sinon.spy(blast, 'beam');
    middleware = blast.fire(action, parse, callback);
  });

  afterEach(function () {
    blast = null;
    middleware = null;
    next.reset();
    parse.reset();
    parse.withArgs(req).returns(req.ip);
  });

  describe('instance', function () {
    it('should have a "fire" function', function () {
      blast.fire.should.be.a('function');
    });

    describe('#fire()', function () {
      it('should return a middleware function', function () {
        middleware.should.be.a('function');
      });

      describe('The middleware function', function () {
        describe('when called with all arguments', function () {
          it('should call the #beam() function', function () {
            middleware(req, res, next);
            blast.beam.should.have.been.calledOnce;
            blast.beam.should.have.been.calledWith(action, req.ip, callback);
          });

          it('should call the passed parse() argument', function () {
            middleware(req, res, next);
            parse.should.have.been.calledOnce;
            parse.should.have.been.calledWith(req);
          });

          it('should call the passed next() argument', function () {
            middleware(req, res, next);
            next.should.have.been.calledOnce;
          });

          it('should throw error when passed action is not a string', function () {
            blast.fire.should.throw(Error);
          });
        });

        describe('when called without callback', function () {
          it('should use default callback', function () {
            let m = blast.fire(action, parse);
            m(req, res, next);
            blast.beam.should.have.been.calledOnce;
            blast.beam.should.have.been.calledWith(action, req.ip, privates.noop);
          });
        });

        describe('when called without a parse function', function () {
          it('should use default parse function', function () {
            let m = blast.fire(action);
            m(req, res, next);
            blast.beam.should.have.been.calledOnce;
            blast.beam.should.have.been.calledWith(action, req.originalUrl, privates.noop);
          });
        });
      });
    });
  });
});

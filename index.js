'use strict';
let ParticleBeam = require('particle-beam');

// default request parser
let handleRequest = function (req) {
  return req.originalUrl;
};

/*
  Options list:
  - device    (Particle device id)
  - token     (Particle Build token)
 */
let Blast = function (options) {
  this.beam = ParticleBeam({
    'device': options.device,
    'token': options.token
  });
};

/*
  Arguments:
  - action    (Required, Name of registred Particle function)
  - parse     (Optional, User defined function to parse request into sendable data to particle device)
  - callback  (Optional, callback once Particle API successfully hit)
 */
Blast.prototype.fire = function (action, parse, callback) {
  let argLength = arguments.length;
  if(argLength < 1 || argLength > 3) {
    throw new Error('invalid number of arguments');
  }
  parse = argLength === 3 ? parse : handleRequest;
  callback = arguments[argLength - 1];

  return (req, res, next) => {
    this.beam(action, parse(req), callback);
    next();
  };
};

module.exports = Blast;

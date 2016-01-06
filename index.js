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
  if (typeof action !== 'string') {
    throw new TypeError('action must be a string');
  }
  parse = parse || handleRequest;
  callback = callback || function () {};

  return (req, res, next) => {
    this.beam(action, parse(req), callback);
    next();
  };
};

module.exports = Blast;

'use strict';
let ParticleBeam = require('particle-beam');

// default request parser
let handleRequest = function (req) {
  return ${req.originalUrl};
};

/*
  Options list:
  - device    (Particle device id)
  - token     (Particle Build token)
  - action    (Name of registred Particle function)
  - parse     (User defined function to parse request into sendable data to particle device)
  - callback  (Optional callback once Particle API successfully hit)
 */
let Blast = function (options) {
  this.beam = ParticleBeam({
    'device': options.device,
    'token': options.token
  });
  this.action = options.action;
  this.parse = options.parse || handleRequest;
  this.callback = options.callback || function () {};
};

Blast.prototype.fire = function (req, res, next) {
  let data = `${req.route}:${req.prams}`;
  this.beam(this.action, this.parse(req), this.callback);
  next();
};

module.exports = Blast;
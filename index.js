let ParticleBeam = require('particle-beam');

// default request parser
let handleRequest = function (req) {
  'use strict';
  return req.originalUrl;
};

/*
  Options list:
  - device    (Particle device id)
  - token     (Particle Build token)
 */
let Blast = function (options) {
  'use strict';

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
  'use strict';

  parse = parse || handleRequest;
  callback = callback || function () {};

  return function (req, res, next) {
    this.beam(action, parse(req), callback);
    next();
  }.bind(this);
};

module.exports = Blast;

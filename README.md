# Particle-Blast

Middleware to conveniently blast your Particle device with request details.

## Usage

First, create a new instance and pass in device credentials
```javascript
let ParticleBlast = require('particle-blast');

let blast = new ParticleBlast({
  'device': [your device id],
  'token': [your user token]
});
```
Calling the `.fire()` method of the instance will return an Express/Connect compatible middlware function.
```javascript
let express = require('express');
let app = express();

// using the blast instance we created previously
app.use(blast.fire([deviceFunction], [parseFunction], [callback]))

// ... continue configuring express app ...
```

### #fire([deviceFunction], [parseFunction], [callback])

Returns middleware function.

**Arguments:**

`deviceFunction` - **String**, name of registered Particle Function you wish to invoke.

`parseFunction` - **Function**, takes the request object as an argument. Use this to get whatever data you need from the request object. This will return the string data your registered Particle Function may require.

`callback` - **Function**, callback to execute after your device returns an error and/or data.

```javascript
let parseReq = function (req) {
  return req.ip;
};

// arguments as passed by Particle Cloud
let callback = function (err, response, data) {
  if(err) {
   console.log('ERROR: ', err);
  }
  conosle.log('Returned by Particle Cloud: ', data);
};

app.use(blast.fire('ipToLCD', parseReq, callback));
```

A single blast instance can be reused to run multiple registered functions if multiple functions are registered to the same device.

```javascript
  app.use(blast.fire('fn1', parseOne, callbackOne));
  app.use(blast.fire('fn2', parseTwo, callbackTwo));
```

/* (c) 2015 Ari Porad (@ariporad) <ari@ariporad.com>. MIT Licensed */

/**
 * Module dependencies.
 */

var debug = require('debug')('koa.io:socket.io:router');
var convert = require('koa-convert');
var compose = require('koa-compose');
var co = require('co');

/**
 * create a event checker
 * @param {String|RegExp} name
 * @return {function}
 */

function createChecker(_name) {
  if (!_name) {
    return function dummyChecker() {
      return true;
    };
  }
  var name = _name;
  if (typeof name === 'string') {
    name = name.replace(/\*/g, '.*?');
    name = new RegExp('^' + name + '$');
  }

  debug('regexp: %s', name);
  return function checker(event) {
    var match = event.match(name);
    // only match the whole event
    return match && match.index === 0 && match[0].length === event.length;
  };
}

/**
 * create a router with event match
 * @return {GeneratorFunction}
 */

function createRoute(_event, _fn) {
  var fn = _fn;
  var event = _event;
  if (typeof event === 'function') {
    fn = event;
    event = null;
  }

  var checker = createChecker(event);
  console.log("gssssssssssssssssssssssssssssssssssssss")
  return async function createdRoute(ctx, next) {
    console.log("fffffffffffffffffffffff")
    console.log('check `%s` to match `%s`, %s', ctx.event, event, checker(ctx.event));
    if (!checker(ctx.event)) {
      return await next();
    }
    var args = [next].concat(ctx.data);
    await fn.apply(ctx, args);
  };
}

/**
 * a simple event router object
 */

function Router() {
  if (!(this instanceof Router)) return new Router();
  this.fns = [];
}

/**
 * create a socket.io middleware
 *
 * @return {GeneratorFunction}
 */

Router.prototype.middleware = function middleware() {
  var router = this;
  var gen = compose(this.fns);
  console.log('in router middleware',this.fns.length);
  return async function route(ctx, next) {
    console.log("sbsbsbsb")
    if (!router.fns.length) {
      console.log('router not exist');
      return await next();
    }
    var self = ctx;
    var socket = ctx.socket;
  console.log("sbsbsbsb")
    // replace socket.onevent to start the router
    socket._onevent = socket.onevent;
    console.log("sdfsdf", socket._onevent)
    socket.onevent = function monkeypatchedOnEvent(packet) {
      var args = packet.data || [];
      console.log("sbsbsbsb", self.data )
      if (!args.length) {
        console.log('event args not exist');
        return socket._onevent(packet);
      }

      self.event = args[0];
      self.data = args.slice(1);
      console.log("sdfsdfsfsdfsdfsdfsdfsdfdsf")
      gen(self)
        .then(function genSuccess() {
          socket._onevent(packet);
        })
        .catch(function genError(err) {
          console.log('error: ' + err.message);
          console.error(err.stack);
        });
    };

    await next();
  };
};


/**
 * add a route into router
 * @param {String|RegExp} event
 * @param {GeneratorFunction} fn
 */

Router.prototype.route = function route(event, fn) {
  this.fns.push(createRoute(event, fn));
};

/**
 * Module expose.
 */

module.exports = Router;

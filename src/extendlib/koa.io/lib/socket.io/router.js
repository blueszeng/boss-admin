/* (c) 2015 Ari Porad (@ariporad) <ari@ariporad.com>. MIT Licensed */

/**
 * Module dependencies.
 */

var debug = require('debug')('koa.io:socket.io:router');
var compose = require('koa-compose');
var _ = require('lodash');
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
  if (!_.isArray(_fn)) {
    fn = [_fn]
  }
  var event = _event;
  if (_.isFunction(event) || _.isArray(event)) {
    fn = event;
    event = null;
  }

  var checker = createChecker(event);
  return async function createdRoute(ctx, next) {
    debug('check `%s` to match `%s`, %s', ctx.event, event, checker(ctx.event));
    if (!checker(ctx.event)) {
      return await next();
    }
    var gen = compose(fn);
    gen(ctx, next)
      .catch(function genError(err) {
        console.log('error: ' + err.message);
        console.error(err.stack);
      });
  };
  // console.log("gsssssssssssssssssssss")
  // var args = [ctx, next];
  // await fn[0].apply(ctx, args);
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
  debug('in router middleware');
  return async function route(ctx, next) {
    if (!router.fns.length) {
      debug('router not exist');
      return await next();
    }
    var self = ctx;
    var socket = ctx.socket;
    // replace socket.onevent to start the router
    socket._onevent = socket.onevent; // save old onevent func
    socket.onevent = function monkeypatchedOnEvent(packet) {
      var args = packet.data || [];
      if (!args.length) {
        console.log('event args not exist');
        return socket._onevent(packet); //call old onevent 
      }

      self.event = args[0];
      self.data = args.slice(1)[0];
      (async function () {
        if (ctx.decrypt && _.isFunction(ctx.decrypt)) {  // decrypt data
          try {
            self.data = await ctx.decrypt(self.data);
          } catch (err) {
            console.log(err);
          }
        }
      })()
      gen(self)
        .then(function genSuccess() {
          socket._onevent(packet); //call old onevent 
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

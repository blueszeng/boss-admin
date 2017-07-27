/* (c) 2015 Ari Porad (@ariporad) <ari@ariporad.com>. MIT Licensed */

/**
 * Module dependencies.
 */

var debug = require('debug')('koa.io:socket.io:namespace');
var compose = require('koa-compose');
var Socket = require('./socket');
var co = require('co');
const convert = require('koa-convert');
const isGeneratorFunction = require('is-generator-function');

/**
 * onconnect middleware
 */

function onconnect(nsp) {
  debug('on connect');
  return async function onconnectMiddleware(ctx, next) {
    process.nextTick(
      function () {
        var socket = ctx.socket;
        var fn = ctx._fn;
        if (socket.client.conn.readyState !== 'open') {
          console.log('next called after client was closed - ignoring socket');
          return;
        }
        nsp.sockets.push(socket);
        socket.onconnect();

        if (fn) fn();
        nsp.emit('connect', socket);
        nsp.emit('connection', socket);
        // after socket emit disconnect, resume middlewares
        function ondisconnect() {
          socket.once('disconnect', async function socketDisconnected(reason) {
            debug('socket disconnect by %s', reason);
            await next();
          });
        };
        ondisconnect();
      });
  }
}

/**
 * wrap a generatorFunction to koa.io's middleware
 *
 * @param {GeneratorFunction} fn
 * @return {GeneratorFunction}
 * @api private
 */

function createMiddleware(fn, nsp) {
  return async function middleware(ctx, next) {
    debug('yield next, continue middlewares');
    var args = [ctx, next];
    await fn.apply(ctx, args);
  };
}

/**
 * Adds a new client.
 * rewrite socket.io's namespace.prototype.add
 *
 * @return {Socket}
 * @api private
 */

exports.add = function add(client, fn) {
  debug('adding socket to nsp %s', this.name);
  var socket = Socket(this, client);
  socket._fn = fn;

  // koa style middleware support
  if (!this.gen) {
    this._onconnect = onconnect(this);
    debug('compose middlewares');
    this.gen = compose(this.fns.concat([this.router.middleware(), this._onconnect]));
  }
  this.gen(socket)
    .catch(function catchError(err) {
      console.log(err)
      /* istanbul ignore else */
      if (client.conn.readyState === 'open') {
        /* istanbul ignore else */
        if (err) {
          return socket.socket.error(err.data || err.message);
        }
      }
    });
  return socket.socket;
};


/**
 * wrap a fn to a middleware function
 *
 * @param {GeneratorFunction} fn
 * @api public
 */
exports.use = function use(fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
  if (isGeneratorFunction(fn)) {
    fn = convert(fn);
  }
  this.fns.push(createMiddleware(fn, this));
  return this;
};

/**
 * add route for socket event
 *
 * @param {String|RegExp} event
 * @param {GeneratorFunction} handler
 * @return {this}
 */

exports.route = function route(event, handler) {
  this.router.route(event, handler);
  return this;
};

import RoomIO from './room'
import promisify from './promisecover'

export class Request {
    constructor(socket, request, io) {
        this.socket = socket
        this.request = request
        this.manager = io
        // this.socket.emit = promisify(this.socket.emit)
    }
    broadcast(event, message) {
        this.socket.broadcast.emit(event, message)
    }
    emit(event, message, cb) {
        this.socket.emit(event, message, cb)
    }
    get(key, cb) {
        this.socket.get(key, cb)
    }
    set(key, val, cb) {
        this.socket.set(key, val, cb)
    }
    room(room) {
        new RoomIO(room, this.socket)
    }
    join(room) {
        socket.join(room)
    }
    route(route) {
        this.manager.route(route, this.request, {trigger: true})
    }
    leave(room) {
        socket.leave(room)
    }
    on() {
        args = Array.prototype.slice.call(arguments, 0)
        this.socket.on.apply(this.socket, args)
    }
    disconnect(callback) {
        this.socket.disconnect(callback)
    }

}

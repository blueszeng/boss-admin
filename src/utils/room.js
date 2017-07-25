export class RoomIO {
  constructor(name, socket) {
    this.name = name
    this.socket = socket
  }
  broadcast(event, message) {
    if (this.socket.broadcast) {
      this.socket.broadcast.to(this.name).emit(event, message)
    } else {
      this.socket.in(this.name).emit(event, message)
    }
  }
}

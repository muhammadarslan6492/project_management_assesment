import { Server } from 'socket.io'

class Socket {
  constructor(server) {
    const io = new Server(server, {})
    this.io = io
    this.connectedClients = {}

    io.on('connection', (socket) => {
      this.connectedClients[socket.handshake.query.userId] = socket.id
      console.log(this.connectedClients)
      socket.on('disconnect', () => {
        console.log(
          `user ${
            this.connectedClients[socket.handshake.query.userId]
          } disconnected`
        )
        delete this.connectedClients[socket.handshake.query.userId]
        console.log(this.connectedClients)
      })
    })
  }

  generateReminder(userId, data) {
    try {
      this.io.to(this.connectedClients[userId]).emit('reminder', data)
      return true
    } catch (error) {
      return error
    }
  }

  adminNotifications(userId, data) {
    try {
      this.io
        .to(this.connectedClients[userId])
        .emit('admin-notifications', data)
      return true
    } catch (error) {
      return error
    }
  }
}

export default Socket

const formatMessage = require('./messages')
const { getCurrentUser, userJoin, userLeave, getAllUsers } = require('./users')
const botName = 'Elon Musk '
const sharedSessions = require('express-socket.io-session')

const initSocketIO = (server, newSession) => {
  const io = require('socket.io')(server)

  io.use(sharedSessions(newSession))

  io.on('connection', (socket) => {
    let user = userJoin(socket.id, socket.handshake.session.username)
    console.log(user)

    // Welcome current user
    socket.emit(
      'message',
      formatMessage(
        botName,
        'Buy crypto, to the moon 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀!'
      )
    )

    // Broadcast who joined the room
    socket.broadcast.emit(
      'message',
      formatMessage(
        botName,
        `${user.username} has bought some crypto! Lets go to the moon!🚀`
      )
    )
    socket.emit('userList', getAllUsers())

    // Emit a message
    socket.on('chatMessage', (message) => {
      user = getCurrentUser(socket.id)
      io.emit('message', formatMessage(user.username, message))
    })

    socket.on('disconnect', () => {
      // Broadcast who left the room
      userLeave(socket.id)
      socket.emit('userList', getAllUsers())
      socket.broadcast.emit(
        'message',
        formatMessage(botName, `${user.username} did the big leave!🚀`)
      )
    })
  })
}
module.exports = {
  initSocketIO,
}

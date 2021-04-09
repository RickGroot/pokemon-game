const port = process.env.PORT || 8000
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const {home, room, setUserName, makeRoom} = require('./server/render.js')
const {roomRedirect, joinRoom} = require('./server/redirect.js')

app
    .engine('.html', ejs.__express)
    .set('views', 'src/views')
    .set('view engine', 'html')
    .use(express.static(path.resolve('public')))
    .use(bodyParser.urlencoded({ extended: true}))
    .use(bodyParser.json())
    .use(express.json())
    .get('/', home)
    .get('/username/:room', setUserName)
    .get('/makeRoom', makeRoom)
    .get('/game/:room/:user', room)
    .post('/room-redirect', roomRedirect)
    .post('/joinRoom/:room', joinRoom)
    .get('*', error)

function error(req, res) {
    res.status(404).render('not-found', {
        title: '404 Not Found',
        socket: false
    })
}

io.on('connection', (socket) => {
    // console.log('a user has connected')
    let id = socket.id
    // console.log(id)

    socket.on('join', function(room) {
        socket.join(room)
        let roomUsers = io.sockets.adapter.rooms[room]
        // console.log(room.user, 'connected to', room.room)

        // let roomUsers = io.sockets.clients(room)
        console.log(roomUsers)
        io.sockets.emit('userList', room)
    })

    socket.on('disconnect', () => {
        // console.log('user disconnected')
    })
})

http.listen(port, () => {
    console.log('App listening on http://localhost:' + port)
})
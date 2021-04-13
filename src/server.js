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

const userNames = {}

io.on('connection', (socket) => {

    socket.on('join', data => {
        let userName = data.name
        let userId = socket.id
        let roomName = data.room
        
        socket.join(roomName)
        userNames[userId] = {userName: userName, room: roomName, score: 0}

        sendUsers(roomName)
    })

    socket.on('chat', data => {
        console.log('message', data)
        let room = data.room
        io.sockets.in(room).emit('chat', data)
    })

    socket.on('disconnect', () => {
        let userId = socket.id
        delete userNames[userId]
        sendUsers()
    })
})

function sendUsers(room) {
    let roomData = []

    for (const [key, value] of Object.entries(userNames)) {
        if(value.room === room) {
            roomData.push(userNames[key])
        }
    }

    io.sockets.in(room).emit('userList', roomData)
}

http.listen(port, () => {
    console.log('App listening on http://localhost:' + port)
})
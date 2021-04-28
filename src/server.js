// ----------------------------------------------------------------------------------------------- Imports and requires
const port = process.env.PORT || 8000
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

// ----------------------------Imports socket events
const serverSocket = require('./server/socket.js')(io);

// ----------------------------Imports other files
const {
    home,
    room,
    setUserName,
    makeRoom
} = require('./server/render.js')
const {
    roomRedirect,
    joinRoom
} = require('./server/redirect.js')
const {
    deleteRoom
} = require('./server/rooms.js')

// ----------------------------------------------------------------------------------------------- Express routing
app
    .engine('.html', ejs.__express)
    .set('views', 'src/views')
    .set('view engine', 'html')
    .use(express.static(path.resolve('public')))
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(express.json())
    .get('/', home)
    .get('/username/:room', setUserName)
    .get('/makeroom', makeRoom)
    .get('/game/:room/:user', room)
    .post('/room-redirect', roomRedirect)
    .post('/joinRoom/:room', joinRoom)
    .get('*', error)

// ----------------------------------------------------------------------------------------------- 404 page
function error(req, res) {
    res.status(404).render('not-found', {
        title: '404 Not Found',
        socket: false
    })
}

// ----------------------------------------------------------------------------------------------- listen to port
http.listen(port, () => {
    console.log('App listening on http://localhost:' + port)
})


const port = process.env.PORT || 8000
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const {home, room, setUserName} = require('./server/render.js')

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
    .post('/game/:room?', room)
    .get('*', error)

function error(req, res) {
    res.status(404).render('not-found', {
        title: '404 Not Found'
    })
}

io.on('connection', (socket) => {
    console.log('a user has connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(port, () => {
    console.log('App listening on http://localhost:' + port)
})
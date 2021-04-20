// ----------------------------------------------------------------------------------------------- Imports and requires
const port = process.env.PORT || 8000
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const fetch = require('node-fetch')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

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

// ----------------------------------------------------------------------------------------------- Global variable storage
let userNames = {}
let pokemons = []

// ----------------------------------------------------------------------------------------------- Socket events
io.on('connection', (socket) => {

    // ------------------------------------------------------ When a client connecs to a room
    socket.on('join', data => {
        let userName = data.name
        let userId = socket.id
        let roomName = data.room
        let score = 0;

        socket.join(roomName)
        userNames[userId] = {
            userName: userName,
            room: roomName,
            score: score
        }

        sendUsers(roomName)
        sendPokemon(roomName)
    })

    // ------------------------------------------------------ On a chat message
    socket.on('chat', data => {
        let room = data.room
        io.sockets.in(room).emit('chat', data)
    })

    // ------------------------------------------------------ When someone won a round
    socket.on('win', data => {
        let userId = socket.id
        let roomName = data.room
        let score = Number(data.score)
        let newScore = score + 1

        userNames[userId].score = newScore

        fetchNewPokemon(roomName)
        sendUsers(roomName)
        io.sockets.in(roomName).emit('win', data.user)
    })

    // ------------------------------------------------------ Request for new pokemon
    socket.on('request', data => {
        fetchNewPokemon(data)
    })

    // ------------------------------------------------------ When a user disconnects
    socket.on('disconnect', () => {
        let userId = socket.id
        let user = userNames[userId]
        delete userNames[userId]
        sendUsers()

        // set timeout to check users in room, timeout is for refresh
        setTimeout(() => {
            if (user) {
                checkRoomCount(user)
            }
        }, 10000)
    })
})

// ----------------------------------------------------------------------------------------------- Checks amount of users in room
function checkRoomCount(user) {
    let data = user
    // error prevention
    if (!io.sockets.adapter.rooms.get(data.room)) {
        console.log('no clients in ', data.room)
        // delete empty room
        deleteRoom(data.room)
    }
}

// ----------------------------------------------------------------------------------------------- Send user list to clients
function sendUsers(room) {
    let roomData = []

    for (const [key, value] of Object.entries(userNames)) {
        if (value.room === room) {
            roomData.push(userNames[key])
        }
    }

    io.sockets.in(room).emit('userList', roomData)
}

// ----------------------------------------------------------------------------------------------- Fetches pokemon
function fetchNewPokemon(room) {
    fetch('https://pokeapi.co/api/v2/pokemon-form/' + (Math.floor(Math.random() * 898) + 1) + '/')
        .then(res => res.json())
        .then(res => modulateData(res, room))
}

// ----------------------------------------------------------------------------------------------- Modulate fetched data
function modulateData(data, room) {
    pokemons = pokemons.filter(obj => {
        return obj.room !== room
    })

    let obj = {
        room: room,
        pokemon: {
            name: data.pokemon.name,
            img: data.sprites.front_default
        }
    }

    pokemons.push(obj)

    io.sockets.in(room).emit('pokemon', obj)
}

// ----------------------------------------------------------------------------------------------- Send current pokemon to new joined clients
function sendPokemon(room) {
    let obj
    pokemons.forEach(item => {
        if (item.room === room) {
            obj = item
        }
    })

    io.sockets.in(room).emit('pokemon', obj)
}
// ----------------------------------------------------------------------------------------------- Imports
const fetch = require('node-fetch')

// ----------------------------------------------------------------------------------------------- Global variable storage
let userNames = {}
let pokemons = []
let noWinTimer // timeout

module.exports = io => {
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
            clearTimeout(noWinTimer)

            let userId = socket.id
            let roomName = data.room
            let score = Number(data.score)
            let newScore = score + 1

            userNames[userId].score = newScore

            sendUsers(roomName)

            if (newScore === 5) {
                io.sockets.in(roomName).emit('gameWin', data.user)
            } else {
                fetchNewPokemon(roomName)
                io.sockets.in(roomName).emit('win', data.user)
            }
        })

        // ------------------------------------------------------ Request for new pokemon
        socket.on('request', data => {
            fetchNewPokemon(data)
        })

        socket.on('closeRoom', data => {
            let room = data
            deleteRoom(room)

            io.sockets.in(room).emit('closeRoom')
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
        // max amount: 898
        fetch('https://pokeapi.co/api/v2/pokemon-form/' + (Math.floor(Math.random() * 200) + 1) + '/')
            .then(res => res.json())
            .then(res => modulateData(res, room))

        setWinTimeout(room)
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

    function setWinTimeout(room) {
        noWinTimer = setTimeout(() => {
            fetchNewPokemon(room)
            io.sockets.in(room).emit('noWin')
        }, 40000)
    }
}
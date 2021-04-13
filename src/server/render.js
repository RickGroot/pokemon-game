const {getRoom} = require('./rooms.js')

const home = async (req, res) => {
    let rooms = await getRoom()

    res.render('home', {
        title: 'Home',
        rooms: rooms,
        socket: false
    })
}

const room = async (req, res) => {
    let thisRoom = req.params.room  
    let user = req.params.user   
    let roomData = await getRoom(thisRoom)

    res.render('room', {
        title: 'Room',
        room: thisRoom,
        roomData: roomData,
        user: user,
        socket: true
    })
}

const setUserName = async (req, res) => {
    res.render('username', {
        title: 'username',
        room: req.params.room,
        socket: false
    })
}

const makeRoom = async (req, res) => {
    res.render('makeroom', {
        title: "make new room",
        socket: false
    })
}

module.exports = {home, room, setUserName, makeRoom};
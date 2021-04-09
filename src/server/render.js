const {getRoom} = require('./rooms.js')

const home = async (req, res) => {
    let rooms = await getRoom()

    res.render('home', {
        title: 'Home',
        rooms: rooms
    })
}

const room = async (req, res) => {     
    res.render('room', {
        title: 'Room',
        room: req.params.room,
        user: req.body.username
    })
}

const setUserName = async (req, res) => {
    res.render('userName', {
        title: 'username',
        room: req.params.room
    })
}

module.exports = {home, room, setUserName};
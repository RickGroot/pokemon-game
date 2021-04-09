const {newRoom} = require('./rooms.js')

const roomRedirect = async (req, res) => {
    let room = req.body.room
    await newRoom(room)
    res.redirect('/username/' + room)
}

const joinRoom = async (req, res) => {
    let room = req.params.room
    let user = req.body.user
    res.redirect('/game/' + room + "/" + user)
}

module.exports = {roomRedirect, joinRoom}
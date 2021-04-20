const fs = require('fs')
let path = "./public/scripts/data.json"
let data = JSON.parse(fs.readFileSync(path, "utf8"))

function getRoom(roomParam) {
    if (!roomParam) {
        return data.rooms
    } else {
        for (i = 0; i < data.rooms.length; i++) {
            if (data.rooms[i].name === roomParam) {
                return data.rooms[i]
            }
        }
    }
}

function newRoom(roomName) {
    let rooms = data.rooms
    rooms.push(roomName)
    
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) console.error(err)
    });
}

function deleteRoom(room) {
    console.log('delete', room)
    let rooms = data.rooms
    let index = rooms.indexOf(room)

    rooms.splice(index, 1)
    
    fs.writeFile(path, JSON.stringify(data), (err) => {
        if (err) console.error(err)
    });

    console.log(data)
}

module.exports = {
    getRoom,
    newRoom,
    deleteRoom
}
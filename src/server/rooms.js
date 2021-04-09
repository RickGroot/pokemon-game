const fs = require('fs')
let path = "./public/scripts/data.json"
let data = JSON.parse(fs.readFileSync(path, "utf8"))

function getRoom() {
    return data.rooms
}

module.exports = {getRoom}
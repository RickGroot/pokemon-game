let socket = io()
let socketConnection = io.connect()
let room = document.getElementById('room').innerHTML
let user = document.getElementById('user').innerHTML
let userList = document.getElementById('userList')

let btn = document.getElementById('test')

// emit events
socketConnection.on('connect', () => {
    let userData = {
        name: user,
        userId: socket.id,
        room: room,
        score: 0
    }

    socket.emit('join', userData)
})

//listen to events
socket.on('userList', (data) => {
    console.log("client got userList", data)
    userList.innerHTML = ''

    data.forEach(obj => {
        userList.innerHTML += '<p>' + obj.userName + '</p>'
    })
    
})

if (socket) {
    console.log('socket connected to client')
}
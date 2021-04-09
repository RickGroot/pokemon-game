console.log('connected')

let socket = io()
let room = document.getElementById('room').innerHTML
let user = document.getElementById('user').innerHTML
let userList = document.getElementById('userList')

// emit events
socket.emit('join', {
    room: room,
    user: user
});

//listen to events
socket.on('userList', (data) => {
    userList.innerHTML += '<p>' + data.user + '</p>'
})

if (socket) {
    console.log('socket connected to client')
}
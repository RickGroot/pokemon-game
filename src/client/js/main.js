let socket = io()
let socketConnection = io.connect()
let room = document.getElementById('room').innerHTML
let user = document.getElementById('user').innerHTML
let userList = document.getElementById('userList')
let message = document.getElementById('message')
let form = document.getElementById('form')
let output = document.getElementById('output')

// emit events
socketConnection.on('connect', () => {
    let userData = {
        name: user,
        userId: socket.id,
        room: room
    }

    socket.emit('join', userData)
})

form.onsubmit = ((e) => {
    e.preventDefault()

    socket.emit('chat', {
        user: user,
        room: room,
        message: message.value
    })

    form.reset()
    return false
})

//listen to events
socket.on('userList', data => {
    userList.innerHTML = ''

    data.forEach(obj => {
        userList.innerHTML += '<div><p class="username">' + obj.userName + '</p><p class="score">' + obj.score + '</p></div>'
    })

})

socket.on('chat', data => {
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>'
})

if (socket) {
    console.log('socket connected to client')
}
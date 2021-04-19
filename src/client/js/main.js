// ---------------------------------------------------------------------------------------------------------- variables from document
let socket = io()
let socketConnection = io.connect()
let room = document.getElementById('room').innerHTML
let user = document.getElementById('user').innerHTML
let score
let userList = document.getElementById('userList')
let message = document.getElementById('message')
let form = document.getElementById('form')
let output = document.getElementById('output')
let image = document.getElementById('imgP')
let pokemonData

// ---------------------------------------------------------------------------------------------------------- emit events
socketConnection.on('connect', () => {
    let userData = {
        name: user,
        userId: socket.id,
        room: room,
        score: score
    }

    socket.emit('join', userData)
})

// when someone submits a guess
form.onsubmit = ((e) => {
    e.preventDefault()

    socket.emit('chat', {
        user: user,
        room: room,
        message: message.value,
    })

    // if guess is correct
    if (message.value.toLowerCase() === pokemonData.pokemon.name) {
        image.classList.remove('animate')
        addWin()
    }

    form.reset()
    return false
})

// add a win to live users score
function addWin() {
    // current score from document
    let score = document.querySelector('.thisUser .score').innerHTML

    socket.emit('win', {
        user: user,
        room: room,
        score: score
    })
}

// ---------------------------------------------------------------------------------------------------------- listen for events from server
socket.on('userList', data => updateList(data))

socket.on('chat', data => {
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>'
})

socket.on('win', data => {
    output.innerHTML += '<p class="win"><strong>' + data + ' has guessed the pokemon!</strong></p>'
})

socket.on('pokemon', data => {
    if (!data) {
        socket.emit('request', room)
    } else {
        console.log(data.pokemon.name)
        pokemonData = data
        image.src = data.pokemon.img
        image.classList.add('animate')
    }
})

// updates userlist, so scores and users
function updateList(data) {
    userList.innerHTML = ''

    data.forEach(obj => {
        let me

        if (obj.userName === user) {
            me = 'thisUser'
        } else {
            me = 'user'
        }

        userList.innerHTML += '<div class=' + me + '><p class="username">' + obj.userName + '</p><p class="score">' + obj.score + '</p></div>'
    })
}
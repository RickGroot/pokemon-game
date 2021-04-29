// ---------------------------------------------------------------------------------------------------------- variables from document
let socket = io()
let socketConnection = io.connect()
let room = document.getElementById('room').innerHTML
let user = document.getElementById('user').innerHTML
let userList = document.getElementById('userList')
let message = document.getElementById('message')
let form = document.getElementById('form')
let button = document.querySelector('input[type=submit]')
let output = document.getElementById('output')
let pokemonField = document.getElementById('pokemon')
let image = document.getElementById('imgP')
let winTextTime = 3000
let guessTime = 30000
let pokemonData
let score
let noWin

// ---------------------------------------------------------------------------------------------------------- emit events
// ------------------------------------------------------- on connection to the room
socketConnection.on('connect', () => {
    let userData = {
        name: user,
        userId: socket.id,
        room: room,
        score: score
    }

    socket.emit('join', userData)
})

// ------------------------------------------------------- when someone submits a guess
form.onsubmit = ((e) => {
    e.preventDefault()

    socket.emit('chat', {
        user: user,
        room: room,
        message: message.value,
    })

    // ------------------------------------------------------- if guess is correct
    if (message.value.toLowerCase() === pokemonData.pokemon.name) {
        clearTimeout(noWin)
        image.classList.remove('animate')
        addWin()
    }

    form.reset()
    return false
})

// ------------------------------------------------------- add a win to live users score
function addWin() {
    // current score from document
    let score = document.querySelector('.thisUser .score span').innerHTML

    socket.emit('win', {
        user: user,
        room: room,
        score: score
    })
}

// ---------------------------------------------------------------------------------------------------------- listen for events from server
// ------------------------------------------------------- update userlist
socket.on('userList', data => updateList(data))

// ------------------------------------------------------- update chat
socket.on('chat', data => {
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>'
})

// ------------------------------------------------------- emit win message and popup
socket.on('win', user => {
    disableInput()

    output.innerHTML += '<p class="win"><strong>' + user + ' has guessed the Pokémon!</strong></p>'

    let node = document.createElement('h3')
    let text = document.createTextNode(user + ' has guessed correctly!')

    node.id = 'winText'
    node.appendChild(text)
    pokemonField.appendChild(node)

    //remove win text after some time
    setTimeout(() => {
        enableInput()
        let winText = document.getElementById('winText')
        winText.remove()
    }, winTextTime)
})

socket.on('noWin', () => {
    disableInput()
    image.classList.remove('animate')

    output.innerHTML += '<p class="win"><strong>Nobody guessed correctly</strong></p>'

    let node = document.createElement('h3')
    let text = document.createTextNode('The Pokémon was ' + pokemonData.pokemon.name)

    node.id = 'winText'
    node.appendChild(text)
    pokemonField.appendChild(node)

    //remove text after some time
    setTimeout(() => {
        enableInput()
        let winText = document.getElementById('winText')
        winText.remove()
    }, winTextTime)
})

// ------------------------------------------------------- whena user has won
socket.on('gameWin', user => {
    disableInput()
    let node = document.createElement('h3')
    let text = document.createTextNode(user + ' has won the game!')

    node.id = 'winText'
    node.appendChild(text)
    pokemonField.appendChild(node)
    image.src = ''

    output.innerHTML += '<p class="win"><strong>' + user + ' has won!</strong></p>'

    //close room after 5 seconds
    setTimeout(() => {
        closeRoom()
    }, 5000)
})

// ------------------------------------------------------- redirect to home when room is closed
socket.on('closeRoom', () => {
    window.location.href = '/'
})

// ------------------------------------------------------- when a pokemon gets sent from server
socket.on('pokemon', data => {
    if (!data) {
        socket.emit('request', room)
    } else {
        //show new pokemon after win text is gone
        setTimeout(() => {
            pokemonData = data
            image.src = data.pokemon.img
            image.classList.add('animate')
        }, winTextTime)

    }
})

// ------------------------------------------------------- updates userlist, so scores and users
function updateList(data) {
    userList.innerHTML = ''

    data.forEach(obj => {
        let me

        if (obj.userName === user) {
            me = 'thisUser'
        } else {
            me = 'user'
        }

        userList.innerHTML += '<div class=' + me + '><p class="username">' + obj.userName + '</p><p class="score">Score: <span>' + obj.score + '</span></p></div>'
    })
}

// ------------------------------------------------------- close current room and delete from server
function closeRoom() {
    socket.emit('closeRoom', room)
}

// ------------------------------------------------------- Enable and disable input field
function disableInput() {
    message.disabled = true
    button.disabled = true
}

function enableInput() {
    message.disabled = false
    button.disabled = false
}
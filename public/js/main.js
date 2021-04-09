const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const userList = document.getElementById('users')

console.log('THis is socket', socket)

socket.on('connect', (users) => {
  console.log('connectedUSERLIST', users)
})

// Message from server
socket.on('message', (message) => {
  // console.log(message)
  outputMessage(message)

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('userList', (users) => {
  console.log('users in USERLIST', users)
  outputUsers(users)
})

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Get message text
  let message = e.target.elements.msg.value

  message = message.trim()

  if (!message) {
    return false
  }

  // Emit message to server
  socket.emit('chatMessage', message)

  // Clear input
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  const p = document.createElement('p')
  p.classList.add('meta')
  p.innerText = message.username
  p.innerHTML += ` <span>${message.time}</span>`
  div.appendChild(p)
  const para = document.createElement('p')
  para.classList.add('text')
  para.innerText = message.text
  div.appendChild(para)
  document.querySelector('.chat-messages').appendChild(div)
}

// Add users to DOM
function outputUsers(users) {
  console.log('users', users)
  userList.innerHTML = ''
  users.forEach((user) => {
    const li = document.createElement('li')
    li.innerText = user.username
    // const userName = document.createTextNode(user.username)
    // li.appendChild(userName)
    userList.appendChild(li)
  })
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('You are leaving the stonks room, are you sure?')
  if (leaveRoom) {
    window.location.pathname = '/'
  }
})

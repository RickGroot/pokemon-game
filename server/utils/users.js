const users = []

// Join user to chat
function userJoin(id, username) {
  const user = {
    id,
    username,
  }

  users.push(user)

  return user
}

// Get current user
function getCurrentUser(id) {
  console.log('getCurrentUserFunc', id)
  return users.find((user) => user.id === id)
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const isUserLoggedIn = (req, res, next) => {
  console.log('this is achieved')
  if (req.session.username != undefined) {
    return next()
  }
  res.redirect('/')
}

const getAllUsers = () => {
  return users
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  isUserLoggedIn,
  getAllUsers,
}
